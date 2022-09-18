import { Injectable, Session } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { MovieEntity } from './movie.entity';
import { MovieData, MovieRO, SessionData } from './movie.payload';
import { SessionEntity } from './session.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
  ) {}
  
  async addMovie(movie_data: MovieData): Promise<MovieRO>
  {
    const { name, sessions, age_limit } = movie_data;

    const existing_movie = await getRepository(MovieEntity)
      .createQueryBuilder('m')
      .where('m.name = :name', { name: name }) 
      .getOne();

    if(existing_movie != null) {
      const _errors = { movie: 'Given movie is added already' };
      throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);
    }      
    
    await this.checkSessionAvailability(sessions);
    
    const movie = new MovieEntity()
    movie.name = name;
    movie.age_limit = age_limit;
    const movie_entity = await this.movieRepository.save(movie);

    const session_entites = []

    for(let session of sessions) {
      const session_entity = new SessionEntity();
      session_entity.movie = movie_entity;
      session_entity.start_date = session.start_date;
      session_entity.end_date = session.end_date;
      session_entity.room_no = session.room_no;

      session_entites.push(session_entity);
    }

    await this.sessionRepository.save(session_entites);

    return Promise.resolve({movie: movie_data});
  }

  async listMovies(): Promise<MovieData[]> {
    const movies  = await getRepository(MovieEntity)
      .createQueryBuilder('m')
      .leftJoinAndSelect('m.sessions', 's')
      .getMany();

    if(movies == null) {
      return null;
    }
    console.log("movies", movies);
    const movies_data_list = movies.map(movie => {
      const movie_data = new MovieData();
      movie_data.age_limit = movie.age_limit;
      movie_data.name = movie.name;
      movie_data.sessions = movie.sessions.map(session => (
        {
          "room_no": session.room_no,
          "start_date": session.start_date,
          "end_date": session.end_date,
        }
      ));  

      return movie_data;
    });

    return movies_data_list;
  }

  /* check availability of sessions of movie */
  private async checkSessionAvailability(sessions: SessionData[]) {
    const session_start_dates = sessions.map(session => session.start_date);
    const session_room_numbers = sessions.map(session => session.room_no);

    const unavailable_sessions = await getRepository(SessionEntity)
      .createQueryBuilder('s')
      .select(['s.start_date as start_date', 's.end_date as end_date', 's.room_no as room_no'])
      .where('s.start_date IN (:session_start_dates)', { session_start_dates: session_start_dates.toString() }) 
      .andWhere('s.room_no IN (:session_room_numbers)', { session_room_numbers: session_room_numbers.toString() }) 
      .getRawMany();
  
    if(unavailable_sessions.length > 0) {
      for(let new_session of sessions) {
        if(unavailable_sessions.some(us => (us.room_no == new_session.room_no && us.start_date == new_session.start_date))) {
          const _errors = { sessions: 'Given sessions are not available' };
          throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);
        }
      }
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { TicketEntity } from './ticket.entity';
import { BuyTickeDto, WatchMovieDto } from './dto';
import { TicketRO } from './ticket.payload';
import { MovieEntity } from '../movie/movie.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  async buyTicket(ticket_dto: BuyTickeDto): Promise<TicketRO>
  {
    const movie = await getRepository(MovieEntity)
    .createQueryBuilder('m')
    .innerJoinAndSelect('m.sessions', 's')
    .where('m.id = :movie_id', { movie_id: ticket_dto.movie_id }) 
    .andWhere('s.id = :session_id', { session_id: ticket_dto.session_id })
    .getOne();

    const user = await getRepository(UserEntity)
    .createQueryBuilder('u')
    .where('u.id = :user_id', { user_id: ticket_dto.user_id }) 
    .getOne();

    if(movie == null || user == null)
    {
      const _errors = { ticket: 'User or movie can not be found' };
      throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);
    }
    
    if(movie.age_limit > user.age)
    {
      const _errors = { ticket: 'User is not allowed to watch this movie' };
      throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);
    }

    const ticket = new TicketEntity();
    ticket.movie = movie;
    ticket.session = movie.sessions[0];
    ticket.user = user;

    const saved_ticket = await this.ticketRepository.save(ticket);

    return { "ticket": 
      {
      "id": saved_ticket.id,
      "user_id": user.id,
      "movie_id": movie.id,
      "session_id": movie.sessions[0].id
      }
    };
  }

  async watchMovie(watch_movie_dto: WatchMovieDto): Promise<boolean>
  {
    const { user_id, movie_id, session_id } = watch_movie_dto;
    const ticket = await getRepository(TicketEntity)
    .createQueryBuilder('t')
    .where('t.userId = :user_id', { user_id: user_id }) 
    .andWhere('t.movieId = :movie_id', { movie_id: movie_id })
    .andWhere('t.sessionId = :session_id', { session_id: session_id })
    .andWhere('t.used_date is null')
    .getOne();

    if(ticket == null)
    {
      const _errors = { ticket: 'User has not a valid ticket for this movie.' };
      throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);
    }

    ticket.used_date = new Date();

    await this.ticketRepository.save(ticket);

    return Promise.resolve(true);
  }
}

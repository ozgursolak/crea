import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { MovieEntity } from './movie.entity';

@Entity('session')
export class SessionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne(type => MovieEntity, movie => movie.sessions)
  movie: MovieEntity;

  @Column()
  @IsString()
  room_no: string;

  @Column()
  @IsString()
  start_date: string;

  @Column()
  @IsString()
  end_date: string;
}

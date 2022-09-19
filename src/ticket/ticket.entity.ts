import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { IsDate, IsOptional } from 'class-validator';
import { SessionEntity } from '../movie/session.entity';
import { MovieEntity } from '../movie/movie.entity';
import { UserEntity } from '../user/user.entity';

@Entity('ticket')
export class TicketEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => MovieEntity)
  movie: MovieEntity;

  @ManyToOne(type => UserEntity)
  user: UserEntity;

  @ManyToOne(type => SessionEntity)
  session: SessionEntity;

  @Column({nullable: true, default: null })
  used_date!: string | null;

  @CreateDateColumn()
  @IsDate()
  created: Date;
}

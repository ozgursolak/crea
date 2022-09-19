import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { SessionEntity } from './session.entity';

@Entity('movie')
export class MovieEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(type => SessionEntity, session => session.movie)
  sessions: SessionEntity[];

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  age_limit: number;

  @CreateDateColumn()
  @IsDate()
  created: Date;

  @UpdateDateColumn()
  @IsDate()
  updated: Date;
}

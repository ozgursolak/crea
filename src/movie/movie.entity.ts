import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { SessionEntity } from './session.entity';

@Entity('movie')
export class MovieEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

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

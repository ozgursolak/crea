import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import * as argon2 from 'argon2';
import { Role } from './role.enum';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsNumber()
  age: number;

  @Column()
  @IsString()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Customer,
  })
  role: Role;
}

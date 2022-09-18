import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Role } from '../role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly age: number;
  
  readonly role: Role;
}

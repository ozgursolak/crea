import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SessionEntity } from '../session.entity';

export class UpdateMovieDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @IsOptional()
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @ApiProperty()
  readonly sessions: SessionEntity[];

  @IsOptional()
  @ApiProperty()
  readonly age_limit: number;
}

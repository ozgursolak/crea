import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BuyTickeDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly user_id: string;
  
  @IsNotEmpty()
  @ApiProperty()
  readonly movie_id: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly session_id: string;
}

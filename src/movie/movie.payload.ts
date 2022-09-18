import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,} from 'class-validator';


export class SessionData {
  @ApiProperty()
  @IsNotEmpty()
  room_no: string;
  
  @ApiProperty()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty()
  @IsNotEmpty()
  end_date: string;
}

export class MovieData {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  age_limit: number;

  @ApiProperty()
  @IsNotEmpty()
  sessions: SessionData[]
}

export class MovieRO {
  @ApiProperty()
  @IsNotEmpty()
  movie: MovieData;
}

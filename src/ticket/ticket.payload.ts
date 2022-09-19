import { ApiProperty } from "@nestjs/swagger";

export class TicketData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  movie_id: string;
  
  @ApiProperty()
  session_id: string;
}

export class TicketRO {
  @ApiProperty()
  ticket: TicketData;
}

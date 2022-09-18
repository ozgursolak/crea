import { ApiProperty } from "@nestjs/swagger";

export class UserData {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  token: string;
  @ApiProperty()
  age: number;
}

export class UserRO {
  @ApiProperty()
  user: UserData;
}

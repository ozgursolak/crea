import { ApiProperty } from "@nestjs/swagger";
import { Role } from "./role.enum";

export class UserData {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  token: string;
  
  @ApiProperty()
  age: number;
  
  @ApiProperty()
  role: Role;
}

export class UserRO {
  @ApiProperty()
  user: UserData;
}

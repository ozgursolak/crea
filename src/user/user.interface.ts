export interface UserData {
  username: string;
  email: string;
  token: string;
  age: number;
}

export interface UserRO {
  user: UserData;
}

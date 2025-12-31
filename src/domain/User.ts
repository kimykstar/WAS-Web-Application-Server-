export class User {
  readonly password: string;
  readonly nickName: string;
  readonly email: string;

  constructor(password: string, nickName: string, email: string) {
    this.password = password;
    this.nickName = nickName;
    this.email = email;
  }
}

export class User {
  private readonly userId: string;
  private readonly password: string;
  private readonly name: string;
  private readonly email: string;

  constructor(userId: string, password: string, name: string, email: string) {
    this.userId = userId;
    this.password = password;
    this.name = name;
    this.email = email;
  }
}

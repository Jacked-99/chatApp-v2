export class UserModel {
  constructor(
    public avatar: string,
    public userName: string,
    private loggedIn: boolean,
    private expiresIn: Date,
    private _token: string
  ) {}

  get token() {
    if (!this.expiresIn || new Date() > this.expiresIn) {
      return null;
    }
    return this._token;
  }
}

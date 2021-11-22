export class TodoLogIn {
    constructor(init?: Partial<TodoLogIn>) {
      Object.assign(this, init);
    }
    public email?: string;
    public password?: string;
  }
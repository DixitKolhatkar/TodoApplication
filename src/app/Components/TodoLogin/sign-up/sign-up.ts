export class TodoSignUp {
    constructor(init?: Partial<TodoSignUp>) {
      Object.assign(this, init);
    }
    public name?: string;
    public email?: string;
    public password?: string;
    public confirmPassword?:string;
    public phone?:string;
  }
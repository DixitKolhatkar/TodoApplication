
export class TodoList {
    constructor(init?: Partial<TodoList>) {
        Object.assign(this, init);
    }
    public todoTitle?: string;
    public userName?: string;
    public todoItems?: TodoItems[];
}

export class TodoItems {
    constructor(init?: Partial<TodoItems>) {
        Object.assign(this, init);
    }
    public todoName?: string;
    public taskId?: string;
    public isCompleted?: boolean;
    public dateCreated?: string;
}

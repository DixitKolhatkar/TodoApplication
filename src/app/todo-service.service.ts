import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { TodoList } from './Components/todo/todo';

@Injectable({
  providedIn: 'root'
})

export class TodoServiceService {
  public REST_API_ENDPOINT = "http://localhost:3000/";

  private signUpApiUrl: string = this.REST_API_ENDPOINT + "createUser";
  private loginApiUrl: string = this.REST_API_ENDPOINT + "login";
  private addNewTaskApiUrl: string = this.REST_API_ENDPOINT + "addNewTask";
  private deleteTaskApiUrl: string = this.REST_API_ENDPOINT;
  private editTaskApiUrl: string = this.REST_API_ENDPOINT + "editTask";
  private deleteTodoApiUrl: string = this.REST_API_ENDPOINT + "deleteTodo";;
  private addNewTodoApiUrl: string = this.REST_API_ENDPOINT + "addNewTodo";
  private getMyTodoApiUrl: string = this.REST_API_ENDPOINT + "getMyTodos";

  public reqHeader = new HttpHeaders({'No-Auth':'True'});

  public datachange: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public userName: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor(private http: HttpClient) { }

  //Sign Up
  public register(details): Observable<any> {
    return this.http.post(this.signUpApiUrl, details, {headers:this.reqHeader})
      .map((response: any) => response)
      .catch(this.handleError('signUp', []))
  }

  // Log In
  public logIn(details): Observable<any> {
    return this.http.post(this.loginApiUrl, details, {headers:this.reqHeader})
      .map((response: any) => response)
      .catch(this.handleError('login', []))
  }

  // Add New Task
  public addNewTask(todoId: string, myTask: any): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('todoId', todoId);
    return this.http.put(this.addNewTaskApiUrl, myTask, { params })
      .map((response: any) => response)
      .catch(this.handleError('AddNewTask', []))
  }

  // Get My Todos
  public getTodos(userName: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('userName', userName);
    return this.http.get(this.getMyTodoApiUrl, { params })
      .map((response: any) => response)
      .catch(this.handleError('getMyTodo', []))
  }

  // Delete Todo
  public deleteTodo(todoId: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('todoId', todoId);
    return this.http.delete(this.deleteTodoApiUrl, { params })
      .map((response: any) => response)
      .catch(this.handleError('deleteMyTodo', []))
  }

  // Delete Task
  public deleteTask(taskId, todoId): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('todoId', todoId);
    return this.http.delete(this.deleteTaskApiUrl + taskId, { params })
      .map((response: any) => response)
      .catch(this.handleError('delete', []))
  }

  // Edit Task
  public editTask(taskId:string, todoId:string, taskName:string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('todoId', todoId)
      .set('taskId', taskId)
      .set('taskName', taskName)
    return this.http.put(this.editTaskApiUrl, taskId , { params })
      .map((response: any) => response)
      .catch(this.handleError('edit', []))
  }

  // add new todo
  public addNewTodo(todo: TodoList): Observable<any> {
    return this.http.post(this.addNewTodoApiUrl, todo)
      .map((response: any) => response)
      .catch(this.handleError('addNewTodo', []))
  }


  // Handling catch block
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return Observable.of(result as T);
    };
  }
  

}

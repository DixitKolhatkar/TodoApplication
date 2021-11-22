import { Component, OnInit } from '@angular/core';
import { TodoItems, TodoList } from './todo';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoServiceService } from 'src/app/todo-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DatePipe } from '@angular/common';
import { $ } from 'protractor';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [DatePipe]
})
export class TodoComponent implements OnInit {
  public userName: string;
  public displayNewTodofield: boolean = false;
  public addIndex: boolean = false;
  public todoForm: FormGroup;
  public newTodoForm: FormGroup;
  public myFormattedDate;
  public todoList: TodoList[] = [];
  public displayStyle = "none";
  public taskId: string;
  public todoId: string;
  constructor(public formBuilder: FormBuilder, private todoServiceService: TodoServiceService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.myFormattedDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.userName = localStorage.getItem('currentUser');
    this.todoServiceService.datachange.next("true")
    this.getTodos();
    this.buildFormControls();
  }

  public buildFormControls() {
    this.todoForm = this.formBuilder.group({
      "todoName": new FormControl('', [
        Validators.required
      ]),
      "updatedTask": new FormControl('', [
        Validators.required
      ])
    })
    this.newTodoForm = this.formBuilder.group({
      "todoTitle": new FormControl('', [
        Validators.required
      ])
    })
  }

  // get My Todos
  getTodos() {
    this.todoServiceService.getTodos(this.userName).subscribe((response) => {
      if (response) {
        this.todoList = response.MyTodos;
      }
      else {
        this.todoList = [];
      }
    })
  }

  // Add new todo title
  addTodoTitle() {
    let newTodo: TodoList[] = [];
    if (this.newTodoForm.value.todoTitle) {
      newTodo.push({
        todoTitle: this.newTodoForm.value.todoTitle,
        userName: this.userName,
        todoItems: []
      })

      this.todoServiceService.addNewTodo(newTodo[0]).subscribe((response) => {
        this.getTodos();
        this.newTodoForm.get("todoTitle").setValue("");
        Swal.fire('Todo title added successfully');
      })
    }
  }

  // Add new task
  addTask(todoId) {
    if (this.todoForm.get("todoName").value) {
      let myTask: TodoItems[] = [];
      myTask.push(
        {
          todoName: this.todoForm.value.todoName,
          isCompleted: false,
          dateCreated: this.myFormattedDate
        }
      );

      this.todoServiceService.addNewTask(todoId, myTask[0]).subscribe((data) => {
        this.getTodos();
        if (data) {
          Swal.fire('Task added successfully');
        } else {
          Swal.fire('Unable to add task');
        }
      })
      this.todoForm.get("todoName").setValue("");
    }
  }

  // Edit/Update Task
  updateTask() {
    let taskName = this.todoForm.get("updatedTask").value;
    this.todoServiceService.editTask(this.taskId, this.todoId, taskName).subscribe((response) => {
      this.getTodos();
      if (response.result.acknowledged) {
        Swal.fire('Task updated successfully');
      }
      else {
        Swal.fire('Unable to Update task');
      }
      this.displayStyle = "none";
    })
    this.addIndex = false;
  }


  // Deleting Todo
  deleteTodo(todoId: string) {
    this.todoServiceService.deleteTodo(todoId).subscribe((response) => {
      this.getTodos();
      if (response) {
        Swal.fire('Todo deleted successfully');
      }
      else {
        Swal.fire('Unable to Delete todo');
      }

    })

  }

  // Deleting task
  deleteTask(taskId: string, todoId: string) {
    this.todoServiceService.deleteTask(taskId, todoId).subscribe((response) => {
      if (response.result) {
        this.getTodos();
        Swal.fire('Task removed successfully');
      }
      else {
        Swal.fire('Unable to remove task');
      }
    })
  }

  //open block to add new Todo title
  addTodoTitleField() {
    this.displayNewTodofield = true;
  }

  //OPen Modal popup on Edit Click
  editTask(taskId: string, todoId: string, taskName: string) {
    this.addIndex = true;
    // $("#todoin").css("z-index:-1");
    this.taskId = taskId;
    this.todoId = todoId;
    this.todoForm.get("updatedTask").setValue(taskName);
    this.displayStyle = "block";
  }

  //Close Edit Popup
  closePopup() {
    this.displayStyle = "none";
    this.addIndex = false;
  }


}



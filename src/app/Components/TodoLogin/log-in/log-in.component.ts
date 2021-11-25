import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { TodoServiceService } from 'src/app/todo-service.service';
import { TodoLogIn } from './log-in';
import{ Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';  
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public currentUser: string = "";
  public IsTodo: boolean = false;
  public logInForm: FormGroup;
  public logInInfo: TodoLogIn;
  public isValidation:boolean = false;
  public fieldrequired:string;

  constructor(private formBuilder: FormBuilder, private todoServiceService: TodoServiceService, private router:Router) {
    this.logInInfo = new TodoLogIn();
  }

  ngOnInit(): void {
    let cUrl = window.location.pathname;
    if (cUrl === "/todo") {
      this.IsTodo = true;
    }
    this.buildFormControls();

  }
  public buildFormControls() {
    this.logInForm = this.formBuilder.group({
      "email": new FormControl('', [
        Validators.required
      ]),
      "password": new FormControl('', [
        Validators.required
      ])
    })
  }
// validation
  public setFocusOnInvalidField(): void {
    this.isValidation = false;
    this.fieldrequired = "";
    let invalidFields = Object.keys(this.logInForm.controls)
      .filter(c => this.logInForm.get(c).status === "INVALID");

    if (invalidFields.length > 0) {
      let field: string = invalidFields[0];
      this.logInForm.get(field).markAsTouched({ onlySelf: true });

      let inputDetail = Object.keys(this.logInForm.controls)
      .filter(input => input === field);
      if (inputDetail.length > 0) {
        this.isValidation = true;
        this.fieldrequired = field;
      }
    }
  }

  //Login User
  onLogin() {
  if (this.logInForm.status === "INVALID") {
    this.setFocusOnInvalidField();
    return;
  }
    this.logInInfo.email = this.logInForm.value.email;
    this.logInInfo.password = this.logInForm.value.password;

    this.todoServiceService.logIn(this.logInInfo).subscribe((response:any) => {
      if (response.name) {
        this.todoServiceService.userName.next(response.name);
        localStorage.setItem('currentUser', response.name);
        localStorage.setItem('accessToken', response.token);
        this.router.navigate(['/todo']);
      } else {
        Swal.fire( 'Failed!',
        'Email or Password is incorrect',
        'error');  

        this.logInForm.get("email").setValue("");
        this.logInForm.get("password").setValue("");
      }
    },
    (err:HttpErrorResponse)=>{
      console.log("err",err);
      
    })

  }

}

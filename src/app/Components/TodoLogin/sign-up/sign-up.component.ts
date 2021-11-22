import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoServiceService } from 'src/app/todo-service.service';
import { TodoSignUp } from './sign-up';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public registration: TodoSignUp;
  public isValidation: boolean = false;
  public fieldrequired: string;
  constructor(public formBuilder: FormBuilder, private todoServiceService: TodoServiceService, private router: Router) {
    this.registration = new TodoSignUp();
  }

  ngOnInit(): void {
    this.buildFormControls();
  }

  public buildFormControls() {
    this.signUpForm = this.formBuilder.group({
      "name": new FormControl('', [
        Validators.required
      ]),
      "email": new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),

      ]),
      "password": new FormControl('', [
        Validators.required
      ]),
      "confirmPassword": new FormControl('', [
        Validators.required
      ]),
      "phone": new FormControl('', [
        Validators.required,
        Validators.maxLength(14)
      ])
    })
  }

  public setFocusOnInvalidField(): void {
    this.isValidation = false;
    this.fieldrequired = "";
    let invalidFields = Object.keys(this.signUpForm.controls)
      .filter(c => this.signUpForm.get(c).status === "INVALID");

    if (invalidFields.length > 0) {
      let field: string = invalidFields[0];
      this.signUpForm.get(field).markAsTouched({ onlySelf: true });

      let inputDetail = Object.keys(this.signUpForm.controls)
        .filter(input => input === field);
      if (inputDetail.length > 0) {
        this.isValidation = true;
        this.fieldrequired = field;
      }
    }
  }

  onSubmit() {
    if (this.signUpForm.status === "INVALID") {
      this.setFocusOnInvalidField();
      return;
    }
    this.registration.name = this.signUpForm.value.name;
    this.registration.email = this.signUpForm.value.email;
    this.registration.password = this.signUpForm.value.password;
    this.registration.confirmPassword = this.signUpForm.value.confirmPassword;
    this.registration.phone = this.signUpForm.value.phone;

    this.todoServiceService.register(this.registration).subscribe((response) => {

      if (response == null) {
        Swal.fire('User registered succcessfully');
        this.router.navigate(['/logIn']);
      }
      else {
        if (response.message == "Password not matching") {
          Swal.fire('Entered passoword is not matching with Confirm password');
        }
        if (response.message == "User already exist") {
          Swal.fire('User already exist with same Username or Email.');
        }
      }
    })
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoServiceService } from 'src/app/todo-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() IsTodo: boolean;
  public currentUser: string;
  constructor(private router: Router, private todoServiceService: TodoServiceService) {
    this.todoServiceService.datachange.subscribe((data) => {
      if (data) {
        this.IsTodo = true;
      }
    })
    this.todoServiceService.userName.subscribe((uName) => {
      if (uName) {
        this.currentUser = uName;
      }
    })
  }

  ngOnInit(): void {
    // document.body.style.overflow = 'hidden';
   if(window.localStorage.currentUser){
    this.currentUser = window.localStorage.currentUser;
   }
  }

  redirectHome() {
    this.IsTodo = false;
    localStorage.removeItem('accessToken');
    this.router.navigate(['/home']);
  }
}

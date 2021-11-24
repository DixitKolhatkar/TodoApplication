import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo Application';
  public IsTodo: boolean = false;
  constructor(private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === "/todo" || event.urlAfterRedirects === '/todo') {
          this.IsTodo = true;
        }
      }
    });
  }
  ngOnInit() {
  

}
}

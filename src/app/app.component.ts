import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo Application';
  public IsTodo: boolean = false;
  constructor( private elementRef:ElementRef, private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === "/todo" || event.urlAfterRedirects === '/todo') {
          this.IsTodo = true;
        }
      }
    });
  }
  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument
    .body.style.backgroundColor = '#edd1d9';

}
}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        if (localStorage.getItem('accessToken') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set("authToken", localStorage.getItem('accessToken'))
            });
            return next.handle(clonedReq).pipe(
                catchError(this.errorHandle)
            );
        }
        else {
            this.router.navigateByUrl('/login');
        }
       
    }
    errorHandle(error:HttpErrorResponse){
        window.alert(error.message);
        return throwError(error.message || 'server error')
    }
}
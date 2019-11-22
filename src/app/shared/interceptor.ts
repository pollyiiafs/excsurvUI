import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {

    username: string;
    password: string;

    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = window.localStorage.getItem('token');
        let tokenprvt = window.localStorage.getItem('tokenprvt');
        if(token == null || tokenprvt ==  null) {
            this.router.navigate(['login']);
        }
        
        if (token != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Basic ' + btoa(token)
                }
            });
        }
        return next.handle(request);
    }
}
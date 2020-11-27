import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authservice: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authservice.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.authservice.getToken()
                }
            })
        }
        return next.handle(req).pipe(
            catchError(
                (error: HttpErrorResponse) => this.handleAuthError(error)
            )
        )
    }

    private handleAuthError(error: HttpErrorResponse): Observable<any> {
        if (error.status === 401) {
            this.router.navigate(['/login'], {
                queryParams: { sessionFailed: true }
            })
        }
        return throwError(error)
    }
}
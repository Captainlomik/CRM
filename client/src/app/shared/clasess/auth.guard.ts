import { AuthService } from './../services/auth.service';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authServece: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.authServece.isAuthenticated()) {
            return of(true)
        }
        else {
            this.router.navigate(['/login'], {
                queryParams: {
                    accessDenied: true
                }
            })
            return of(false)
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state)
    }
}
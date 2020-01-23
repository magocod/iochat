import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth';
import { AuthRoute } from './interfaces';

/**
 * [routeData description]
 * Note: IAuthRoute + ...others
 */
export type routeData = AuthRoute;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
   ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log('AuthGuard#canActivate called');
    // tslint:disable-next-line
    let url: string = state.url;

    return this.checkLogin(url, next);
    // return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }

  checkLogin(url: string, next: ActivatedRouteSnapshot): boolean {
    // return true;
    // console.log(next.data);
    const routedata = next.data as routeData;

    // authenticated
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // roles
    // if (next.data.roles.includes(this.authService.userRole())) {
    //   return true;
    // } else {
    //   this.router.navigate(['/routeName']);
    //   return false;
    // }

    // permissions
    // if (this.authService.userHasPermissions(next.data.permissions)) {
    //   return true;
    // } else {
    //   this.router.navigate(['/routeName']);
    //   return false;
    // }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

}

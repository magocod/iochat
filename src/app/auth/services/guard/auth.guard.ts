import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';

import {
  Observable,
  // from
} from 'rxjs';

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

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    // tslint:disable-next-line
    let url: string = state.url;

    const res = await this.checkLogin(url, next);
    console.log('AuthGuard#canActivate called', res);
    return res;
    // return true;
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    // return from(this.canActivate(route, state));
    return this.canActivate(route, state);
  }

  async checkLogin(url: string, next: ActivatedRouteSnapshot): Promise<boolean> {
    // return true;
    // console.log(next.data);
    const routedata = next.data as routeData;

    const auth: boolean = await this.authService.isLoggedIn();
    // console.log(auth);
    // authenticated
    if (auth) {
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

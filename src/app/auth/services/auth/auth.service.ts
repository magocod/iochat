import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastController } from '@ionic/angular';

import { environment } from 'src/environments/environment';
import { DjChatHttpOptions, handleError, notifyError } from 'src/app/http-config';

import { Credentials, DJTokenResponse } from './interfaces';
import { DjangoUser } from 'src/app/user';

@Injectable({
  providedIn: 'root'
})
/**
 *
 */
export class AuthService {

  token = '';
  apiURL: string = environment.chatapiurl;
  httpOptions = DjChatHttpOptions;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private http: HttpClient,
    public toast: ToastController
  ) { }

  /**
   * [login description]
   */
  login(credentials: Credentials): Observable<DJTokenResponse<DjangoUser>> {
    return this.http.post<DJTokenResponse<DjangoUser>>(
      `${this.apiURL}/token-auth/`,
      credentials,
      this.httpOptions
    ).pipe(
      catchError(handleError),
      notifyError(this.toast)
    );
  }

  /**
   * [logout description]
   */
  logout(): Observable<any> {
    return this.http.post<any>(
      `${this.apiURL}/user/logout/`,
      {},
      this.httpOptions
    ).pipe(
      catchError(handleError),
      notifyError(this.toast)
    );
  }

  /**
   * [setToken description]
   */
  setToken(payload: DJTokenResponse<DjangoUser>): void {
    this.token = payload.token;
    localStorage.setItem('token', payload.token);
    localStorage.setItem('user', JSON.stringify(payload.user));
    // this.authorizeheaders.headers = this.authorizeheaders.headers.set(
    //  'Authorization', `Token ${tk.token}`
    // );
  }

  /**
   * [removeToken description]
   */
  removeToken(): void {
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * [getAuthorizationToken description]
   */
  getAuthorizationToken(): string {
    if (this.token === '') {
      if (localStorage.getItem('token') !== null) {
        return localStorage.getItem('token');
      }
    }
    return this.token;
  }

  /**
   * [isLoggedIn description]
   */
  isLoggedIn(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  /**
   * [userRole description]
   */
  userRole(): boolean {
    return false;
  }

  /**
   * [userHasPermissions description]
   */
  userHasPermissions(permissions: number[]): boolean {
    return false;
  }

  /**
   * [getUser description]
   */
  getUser(): any {
    return {};
  }

}

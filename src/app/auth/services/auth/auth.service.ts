import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { DjChatHttpOptions, handleError, notifyError } from 'src/app/http-config';

import { ICredentials, IDJTokenResponse } from './interfaces';
import { IDjangoUser } from 'src/app/user';

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
  ) { }

  /**
   * [login description]
   */
  login(credentials: ICredentials): Observable<IDJTokenResponse<IDjangoUser>> {
    return this.http.post<IDJTokenResponse<IDjangoUser>>(
      `${this.apiURL}/token-auth/`,
      credentials,
      this.httpOptions
    ).pipe(
      catchError(handleError),
      notifyError()
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
      notifyError()
    );
  }

  /**
   * [setToken description]
   */
  setToken(payload: IDJTokenResponse<IDjangoUser>): void {
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

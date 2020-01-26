import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

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
    private storage: Storage,
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
  async setToken(payload: DJTokenResponse<DjangoUser>) {
    this.token = payload.token;
    await this.storage.set('token', payload.token);
    await this.storage.set('user', JSON.stringify(payload.user));
    // localStorage.setItem('token', payload.token);
    // localStorage.setItem('user', JSON.stringify(payload.user));
    // this.authorizeheaders.headers = this.authorizeheaders.headers.set(
    //  'Authorization', `Token ${tk.token}`
    // );
  }

  /**
   * [removeToken description]
   */
  async removeToken() {
    await this.storage.remove('token');
    await this.storage.remove('user');
    this.token = '';
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
  }

  /**
   * [getAuthorizationToken description]
   */
  async getAuthorizationToken() {
    if (this.token === '') {
      // if (localStorage.getItem('token') !== null) {
      //   return localStorage.getItem('token');
      // }
      const tk = await this.storage.get('token');
      if (tk !== null) {
        this.token = tk;
      }
    }
    // console.log('tk', this.token);
    return this.token;
  }

  /**
   * [isLoggedIn description]
   */
  async isLoggedIn() {
    // if (localStorage.getItem('token') !== null) {
    //   return true;
    // }
    const tk = await this.storage.get('token');
    // console.log(tk);
    if (tk !== null) {
      return true;
    }
    return false;
  }

  /**
   * [isLoggedIn description]
   */
  getToken(): string {
    return this.token;
  }

  /**
   * [userRole description]
   */
  async userRole(): Promise<boolean> {
    return false;
  }

  /**
   * [userHasPermissions description]
   */
  async userHasPermissions(permissions: number[]): Promise<boolean> {
    return false;
  }

  /**
   * [getUser description]
   */
  async getUser(): Promise<DjangoUser> {
    const user = await this.storage.get('user');
    if (user !== null) {
      return JSON.parse(user) as DjangoUser;
    }
    return {
      id: 0,
      username: '---',
      is_superuser: false,
      is_staff: false,
      email: '---@---.---',
      first_name: '---',
      last_name: '---',
      date_joined: '---',
      user_permissions: [],
    };
  }

}

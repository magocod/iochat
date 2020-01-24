import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

import { from } from 'rxjs';

import { AuthService } from './auth';
import { AuthInterceptorExclude } from 'src/app/http-config';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handleAuthToken(req, next));
  }

  async handleAuthToken(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    console.log('origin', req);

    // console.log(AuthInterceptorExclude.includes(req.url))
    if (AuthInterceptorExclude.includes(req.url)) {
      // console.log('si');
      // pass
      return next.handle(req);
    }

    const authToken = await this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Token ${authToken}`)
    });

    // console.log('origin', req);
    console.log('clone', authReq);

    // send cloned request with header to the next handler.
    return next.handle(authReq).toPromise();
  }

}

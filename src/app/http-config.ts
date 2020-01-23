import { HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, OperatorFunction, Subscriber } from 'rxjs';

import { throwError } from 'rxjs';


export const DjChatHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': environment.chatapiurl,
  })
};

/**
 * [authexclude description]
 */
export const AuthInterceptorExclude: string[] = [
  `${environment.chatapiurl}/token-auth/`,
  `${environment.chatapiurl}/email/`,
];

/**
 * [handleError description]
 */
export function handleError(error) {
  console.log(error.status);
  console.log(error.message);
  let errorMessage = error.message;
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  // window.alert(errorMessage);
  console.log('handleerror:', errorMessage);
  return throwError(errorMessage);
}

/**
 * [notifyError description]
 */
export function notifyError(toastController: any): OperatorFunction<any, any> {
  return (observable) => new Observable((observer: Subscriber<any>) => {
    // this function will called each time this
    // Observable is subscribed to.
    const subscription = observable.subscribe({
      next(value) {
        observer.next(value);
      },
      async error(err) {
        console.log('notifyerror:', err);
        const toast = await toastController.create({
          message: err,
          color: 'danger',
          duration: 2000
        });
        toast.present();
        observer.error(err);
      },
      complete() {
        observer.complete();
      }
    });
    // the return value is the teardown function,
    // which will be invoked when the new
    // Observable is unsubscribed from.
    return () => {
      subscription.unsubscribe();
    };
  });
}

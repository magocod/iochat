import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { LoadingController } from '@ionic/angular';

import {
  AuthService
} from '../../services';

@Component({
  selector: 'app-auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.scss'],
})
export class AuthProfileComponent implements OnInit {

  constructor(
  	private auth: AuthService,
    private router: Router,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {}

  async logout() {
    // console.log('l');
    const loading = await this.loadingController.create({
      message: 'Please Wait...',
      // duration: 2000
    });
    await loading.present();
    const $loading = this.auth.logout().pipe(
      catchError((err) => {
        return of(err);
      }),
      finalize(() => {
        loading.dismiss();
      })
    )
    $loading.subscribe((value) => {
      if (typeof value !== 'string') {
        console.log(value);
        this.auth.removeToken();
        this.router.navigateByUrl('/');
      } else {
        console.log('error', value);
      }
    });
  }

}

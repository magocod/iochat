import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  AuthService,
  Credentials,
  DJTokenResponse
} from '../../services';
import { DjangoUser } from 'src/app/user';

import { LoadingController, ModalController } from '@ionic/angular';

import { AuthUsersModalComponent, ModalEvent } from '../../components/auth-users-modal';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {

  exampleusers: Credentials[] = [
    { email: 'admin@django.com', password: '123' },
    { email: 'userstaff@django.com', password: '123' },
    { email: 'user@django.com', password: '123' },
  ];
  hide = true;

  checkoutForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    public loadingController: LoadingController,
    public modalController: ModalController
  ) {
    this.checkoutForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.setChangeValidate();
  }

  /**
   * [password description]
   */
  get password() {
    return this.checkoutForm.get('password');
  }

  /**
   * [email description]
   */
  get email() {
    return this.checkoutForm.get('email');
  }

  /**
   * [setChangeValidate description]
   */
  setChangeValidate(): void {
    // console.log(this.checkoutForm);
    this.checkoutForm.get('email').valueChanges.subscribe(
      (email) => {
        console.log(email);
      }
    );
    this.checkoutForm.get('password').valueChanges.subscribe(
      (password) => {
        console.log(password);
      }
    );
  }

  /**
   * [onSubmit description]
   */
  async onSubmit(form: FormControl) {
    // Process checkout data here
    // console.log(form);
    // console.log(form.value);
    const loading = await this.loadingController.create({
      message: 'Please Wait...',
      // duration: 2000
    });
    await loading.present();
    const $loading = this.auth.login(form.value).pipe(
      catchError((err) => {
        return of(err);
      }),
      finalize(() => {
        loading.dismiss();
      })
    );

    $loading.subscribe((value: DJTokenResponse<DjangoUser>) => {
      if (typeof value !== 'string') {
        console.log('success', value);
        this.auth.setToken(value);
        this.checkoutForm.reset();
        this.router.navigate(['/app/photo']);
      } else {
        console.log('error', value);
      }
    });
  }

  /**
   * [presentModal description]
   */
  async presentModal() {
    const modal = await this.modalController.create({
      component: AuthUsersModalComponent
    });
    await modal.present();
    const event = await modal.onWillDismiss();
    // console.log(event);
    const data: ModalEvent = event.data;
    console.log(data);
    if (!data.cancelled) {
      this.setUser(data.user_index);
    }
  }

  /**
   * [setUser description]
   */
  setUser(index: number): void {
    console.log(this.email);
    this.checkoutForm.get('email').setValue(
      this.exampleusers[index].email
    );
    this.checkoutForm.get('password').setValue(
      this.exampleusers[index].password
    );
  }

  /**
   * [redirect description]
   */
  redirect(): void {
    this.router.navigate(['/app/photo']);
  }

}

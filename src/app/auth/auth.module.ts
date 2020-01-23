import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// third party
import { IonicModule } from '@ionic/angular';

// local
import { AuthInterceptor } from './services';

import {
  AuthLoginComponent,
  AuthProfileComponent
} from './views';

import {
  AuthUsersModalComponent,
} from './components';

@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthUsersModalComponent,
    AuthProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    AuthLoginComponent,
    AuthProfileComponent
  ],
  entryComponents: [
    AuthUsersModalComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// third party
import { IonicModule } from '@ionic/angular';

// local
import { AuthInterceptor } from './services';

import {
  AuthLoginComponent
} from './views';

import {
  AuthUsersModalComponent,
} from './components';

@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthUsersModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    AuthLoginComponent
  ],
  entryComponents: [
    AuthUsersModalComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class AuthModule { }

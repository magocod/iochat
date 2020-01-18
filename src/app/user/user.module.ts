import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UserRoutingModule } from './user.routing.module';
import { AuthInterceptor } from './services';

import { IonicModule } from '@ionic/angular';

// local modules
import { CoreModule } from 'src/app/core';

import {
  LoginComponent,
  UserBaseComponent,
  UserListComponent,
  UserDetailsComponent,
  UserCreateComponent
} from 'src/app/user/views';


@NgModule({
  declarations: [
    LoginComponent,
    UserBaseComponent,
    UserListComponent,
    UserDetailsComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserRoutingModule,
    CoreModule,
    IonicModule
  ],
  exports: [
    LoginComponent,
    UserBaseComponent,
    UserListComponent,
    UserDetailsComponent,
    UserCreateComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class UserModule { }

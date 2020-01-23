import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserRoutingModule } from './user.routing.module';
import { IonicModule } from '@ionic/angular';

// local modules
import { CoreModule } from 'src/app/core';

import {
  UserBaseComponent,
  UserListComponent,
  UserDetailsComponent,
  UserCreateComponent
} from './views';


@NgModule({
  declarations: [
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
    UserBaseComponent,
    UserListComponent,
    UserDetailsComponent,
    UserCreateComponent
  ]
})
export class UserModule { }

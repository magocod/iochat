import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {
  CoreLayoutComponent,
  AuthProfileComponent,
  PageNotFoundComponent
} from './views';
import { CoreHeaderComponent } from './components';


@NgModule({
  declarations: [
    CoreLayoutComponent,
    CoreHeaderComponent,
    PageNotFoundComponent,
    AuthProfileComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CoreLayoutComponent,
    CoreHeaderComponent,
    PageNotFoundComponent,
    AuthProfileComponent
  ]
})
export class CoreModule {}

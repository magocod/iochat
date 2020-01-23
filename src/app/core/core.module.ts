import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {
  CoreLayoutComponent,
  PageNotFoundComponent
} from './views';
import { CoreHeaderComponent } from './components';


@NgModule({
  declarations: [
    CoreLayoutComponent,
    CoreHeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CoreLayoutComponent,
    CoreHeaderComponent,
    PageNotFoundComponent
  ]
})
export class CoreModule {}

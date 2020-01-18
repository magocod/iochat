import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CoreLayoutComponent } from './views';
import { CoreHeaderComponent } from './components';


@NgModule({
  declarations: [
    CoreLayoutComponent,
    CoreHeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CoreLayoutComponent,
    CoreHeaderComponent
  ]
})
export class CoreModule {}

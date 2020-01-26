import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import {
  CoreLayoutComponent,
  AuthProfileComponent,
  PageNotFoundComponent,
  ConfigProfileComponent
} from './views';
import {
  CoreHeaderComponent,
  CoreDeviceInfoComponent
} from './components';


@NgModule({
  declarations: [
    CoreLayoutComponent,
    CoreHeaderComponent,
    PageNotFoundComponent,
    AuthProfileComponent,
    ConfigProfileComponent,
    CoreDeviceInfoComponent,
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
  ],
  entryComponents: [
    CoreDeviceInfoComponent
  ],
})
export class CoreModule {}

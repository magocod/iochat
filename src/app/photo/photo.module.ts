import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PhotoRoutingModule } from './photo.routing.module';

import { PhotoBaseComponent } from './views';

// local modules
import { CoreModule } from 'src/app/core';

@NgModule({
  declarations: [
    PhotoBaseComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    IonicModule,
    PhotoRoutingModule
  ],
})
export class PhotoModule {}

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// third party
import { IonicModule } from '@ionic/angular';

// locale
import { ChatRoutingModule } from './chat.routing.module';

import {
  ChatDashboardComponent,
  ChatLayoutComponent,
  RoomCreateComponent,
  RoomDetailsComponent,
  RoomListComponent
} from './views';


@NgModule({
  declarations: [
    ChatDashboardComponent,
    ChatLayoutComponent,
    RoomCreateComponent,
    RoomDetailsComponent,
    RoomListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatRoutingModule,
    // third party
    IonicModule
  ],
  exports: [
    ChatDashboardComponent,
    ChatLayoutComponent,
    RoomCreateComponent,
    RoomDetailsComponent,
    RoomListComponent,
  ]
})
export class ChatModule { }

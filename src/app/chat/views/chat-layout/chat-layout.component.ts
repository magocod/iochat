import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  ChatwebsocketService,
  RoomwebsocketService,
} from 'src/app/chat/services';


@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent implements OnInit {

  title = 'Chats';

  constructor(
    private router: Router,
    private chatwebsocketservice: ChatwebsocketService,
    private roomwebsocketservice: RoomwebsocketService
  ) {

  }

  ngOnInit() {
    if (!this.chatwebsocketservice.isConnected()) {
      this.chatwebsocketservice.connect();
    } else {
      console.log('socket chat active');
    }
    if (!this.roomwebsocketservice.isConnected()) {
      this.roomwebsocketservice.connect();
    } else {
      console.log('socket room active');
    }
  }

  get roomSocket(): boolean {
    return this.roomwebsocketservice.isConnected();
  }

  get chatSocket(): boolean {
    return this.chatwebsocketservice.isConnected();
  }

  /**
   * [redirect description]
   */
  redirect(route: string) {
    this.router.navigate([route]);
  }

}

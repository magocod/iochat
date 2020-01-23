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
    this.chatwebsocketservice.connect();
    this.roomwebsocketservice.connect();
  }

  ngOnInit() {
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

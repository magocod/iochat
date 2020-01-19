import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  ChatwebsocketService,
  RoomwebsocketService,
} from 'src/app/chat/services';
import { IDjangoUser } from 'src/app/user/services';

export interface ISideBarItems {
  text: string;
  icon: string;
  href: string;
  is_superuser: boolean;
  permissions: any[];
}

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent implements OnInit {

  items: ISideBarItems[] = [
    {
      text: 'Users',
      icon: 'supervised_user_circle',
      href: '/chat/users',
      is_superuser: true,
      permissions: [],
    },
  ];

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

  sendMsg() {
    // pass
  }

  /**
   * [redirect description]
   */
  redirect(route: string) {
    this.router.navigate([route]);
  }

  /**
   * [filterOptions description]
   */
  filterOptions(): ISideBarItems[] {
    const user: IDjangoUser = JSON.parse(`${localStorage.getItem('user')}`);
    if (user === null) {
      return [];
    }

    if (user.is_superuser) {
      return this.items;
    }

    // super user an permissions
    return this.items.filter((value: ISideBarItems) => {
      if (value.is_superuser === false) {
        return value;
      }
    });
  }

}

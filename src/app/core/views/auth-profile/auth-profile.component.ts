import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { LoadingController } from '@ionic/angular';

import {
  ChatwebsocketService,
  RoomwebsocketService,
} from 'src/app/chat/services';

import {
  AuthService
} from 'src/app/auth';

@Component({
  selector: 'app-auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.scss'],
})
export class AuthProfileComponent implements OnInit {

  // roomsocket = true;
  // chatsocket = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    public loadingController: LoadingController,
    private chatwebsocketservice: ChatwebsocketService,
    private roomwebsocketservice: RoomwebsocketService
  ) { }

  ngOnInit() {}

  async logout() {
    // console.log('l');
    const loading = await this.loadingController.create({
      message: 'Please Wait...',
      // duration: 2000
    });
    await loading.present();
    const $loading = this.auth.logout().pipe(
      catchError((err) => {
        return of(err);
      }),
      finalize(() => {
        loading.dismiss();
      })
    );
    $loading.subscribe(async (value) => {
      if (typeof value !== 'string') {
        console.log(value);
        await this.auth.removeToken();
        this.router.navigateByUrl('/');
      } else {
        console.log('error', value);
      }
    });
  }

  get roomsocket(): boolean {
    return this.roomwebsocketservice.connectionStatus();
  }

  get chatsocket(): boolean {
    return this.chatwebsocketservice.connectionStatus();
  }

  /**
   * [connectChatSocket description]
   */
  connectChatSocket(): void {
    if (!this.chatwebsocketservice.connectionStatus()) {
      this.chatwebsocketservice.connect();
    } else {
      console.log('socket chat active');
    }
  }

  /**
   * [connectRoomSocket description]
   */
  connectRoomSocket(): void {
    if (!this.roomwebsocketservice.connectionStatus()) {
      this.roomwebsocketservice.connect();
    } else {
      console.log('socket room active');
    }
  }

}

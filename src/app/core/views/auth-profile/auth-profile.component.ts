import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';
const { Network } = Plugins;

import {
  LoadingController,
  ModalController,
  Platform
} from '@ionic/angular';

import {
  ChatwebsocketService,
  RoomwebsocketService,
} from 'src/app/chat/services';

import {
  AuthService
} from 'src/app/auth';

import {
  DjangoUser
} from 'src/app/user';

import { CoreDeviceInfoComponent } from '../../components';


@Component({
  selector: 'app-auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.scss'],
})
export class AuthProfileComponent implements OnInit {

  title = 'Profile Settings';

  devicetype = '---';

  // roomsocket = true;
  // chatsocket = true;
  user: DjangoUser = {
    id: 0,
    username: '---',
    is_superuser: false,
    is_staff: false,
    email: '---@---.---',
    first_name: '---',
    last_name: '---',
    date_joined: '---',
    user_permissions: [],
  };

  connectionState = false;
  connectionType = '---';

  constructor(
    private auth: AuthService,
    private router: Router,
    private chatwebsocketservice: ChatwebsocketService,
    private roomwebsocketservice: RoomwebsocketService,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public platform: Platform
  ) { }

  async ngOnInit() {
    this.user = await this.auth.getUser();

    // current
    const status = await Network.getStatus();
    this.connectionState = status.connected;
    this.connectionType = status.connectionType;

    // listener
    Network.addListener('networkStatusChange', (st) => {
      console.log('Network status changed', st);
      this.connectionState = st.connected;
      this.connectionType = st.connectionType;
    });

    // device
    const arr = this.platform.platforms();
    // console.log(arr);
    if (this.platform.is('android')) {
      this.devicetype = 'Android';
    } else if (this.platform.is('desktop')) {
      this.devicetype = 'Desktop';
    }

  }

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

  /**
   * [redirect description]
   */
  navigateConfigProfile(): void {
    this.router.navigate(['/app/profile_config']);
  }

  /**
   * [presentModal description]
   */
  async presentModal() {
    const modal = await this.modalController.create({
      component: CoreDeviceInfoComponent
    });
    await modal.present();
    const event = await modal.onWillDismiss();
  }

}

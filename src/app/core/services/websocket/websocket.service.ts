import { Injectable } from '@angular/core';

import { Observable, fromEvent } from 'rxjs';

import {
  SocketStates
} from './utils';

import { AuthService } from 'src/app/auth';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  instance: WebSocket;
  wsUrl: string;

  observablemessage: Observable<Event>;

  constructor(
    public auth: AuthService,
  ) {

  }

  /**
   * [close description]
   */
  close(): void {
    this.instance.close();
  }

  /**
   * [isConnected description]
   */
  isConnected(): boolean {
    if (this.instance === undefined) {
      return false;
    }
    if (this.instance.readyState === SocketStates.OPEN) {
      return true;
    }
    return false;
  }

  /**
   * [getObservable description]
   */
  getObservable(): Observable<Event> {
    return this.observablemessage;
  }

}

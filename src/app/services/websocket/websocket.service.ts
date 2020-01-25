import { Injectable } from '@angular/core';

import { Observable, fromEvent } from 'rxjs';

import {
  SocketStates
} from './utils';

@Injectable({
  providedIn: 'root'
})
export abstract class WebsocketService {

  instance: WebSocket;
  wsUrl: string;

  observablemessage: Observable<Event>;

  constructor() { }

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
   * [isConnected description]
   */
  connectionStatus(): boolean {
    if (this.instance === undefined) {
      return false;
    }
    if (this.instance.readyState === SocketStates.OPEN) {
      return true;
    }
    if (this.instance.readyState === SocketStates.CONNECTING) {
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

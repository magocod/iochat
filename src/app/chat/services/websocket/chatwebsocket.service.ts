import { Injectable } from '@angular/core';

import { fromEvent } from 'rxjs';

import {
  IChatMessage,
  IRequestMessage,
  IChatSocketResponse,
  ISocketErrorResponse
} from '../chat';

import {
  WebsocketService
} from 'src/app/core/services';

import { environment } from 'src/environments/environment';

type MeesageSocketResponse = IChatSocketResponse<
  IChatMessage | IChatMessage[]  | ISocketErrorResponse
>;

@Injectable({
  providedIn: 'root'
})
export class ChatwebsocketService extends WebsocketService {

  wsUrl = `${environment.chatws}/chat/`;
  messages: IChatMessage[] = [];

  /**
   * [connect description]
   */
  connect(): void {
    const socket = new WebSocket(this.wsUrl);
    this.instance = socket;

    socket.onopen = (event) => {
      this.requestMessages(1);
      console.log('conected function', event);
    };

    socket.onclose = (event) => {
      console.log('disconected function', event);
    };

    this.observablemessage = fromEvent(socket, 'message');

    this.observablemessage.subscribe((val: MessageEvent) => {
      console.log('observable', val);
      console.log('observable', JSON.parse(val.data));
      const data: MeesageSocketResponse = JSON.parse(val.data);
      this.messageEvents(data);
    });

  }

  /**
   * [requestRooms description]
   */
  requestMessages(roomId: number): void {
    if (this.isConnected()) {
      const request: IRequestMessage = {
        method: 'R',
        token: this.auth.getAuthorizationToken(),
        values: { text: '-', room_id: roomId }
      };
      this.instance.send(
        JSON.stringify(request)
      );
    } else {
      console.warn('socket is not connected');
    }
  }

  /**
   * [createMessage description]
   */
  createMessage(messageText: string, roomId: number): void {
    if (this.isConnected()) {
      const request: IRequestMessage = {
        method: 'C',
        token: this.auth.getAuthorizationToken(),
        values: { text: messageText, room_id: roomId }
      };
      this.instance.send(
        JSON.stringify(request)
      );
    } else {
      console.warn('socket is not connected');
    }
  }

  deleteMessage(messageId: number): void {
    if (this.isConnected()) {
      const request: IRequestMessage = {
        method: 'D',
        token: this.auth.getAuthorizationToken(),
        values: { message_id: messageId }
      };
      this.instance.send(
        JSON.stringify(request)
      );
    } else {
      console.warn('socket is not connected');
    }
  }

  /**
   * [getMessages description]
   */
  getMessages(): IChatMessage[] {
    return this.messages;
  }

  joinRoom(roomId: number): void {
    if (this.isConnected()) {
      const request: IRequestMessage = {
        method: 'J',
        token: this.auth.getAuthorizationToken(),
        values: { text: '', room_id: roomId }
      };
      this.instance.send(
        JSON.stringify(request)
      );
    } else {
      console.warn('socket is not connected');
    }
  }

  /**
   * [roomEvents description]
   */
  messageEvents(response: MeesageSocketResponse): void {
    switch (response.method) {

      case 'R':
        this.messages = response.data as IChatMessage[];
        break;

      case 'C':
        const value = response.data as IChatMessage;
        const exist = this.messages.map((room: IChatMessage) => {
          return room.id;
        }).includes(value.id);

        if (exist === false) {
          const temp = [...this.messages];
          temp.push(value);
          this.messages = temp;
        }

        break;

      case 'D':
        const result = response.data as IChatMessage;
        this.messages = this.messages.filter((room: IChatMessage) => {
          if (room.id !== result.id) {
            return room;
          }
        });
        break;

      case 'J':
        console.log(response.data);
        break;

      case 'E':
        console.log(response.data);
        break;

      default:
        // errors or exceptions
        // ...
        break;
    }
  }

}

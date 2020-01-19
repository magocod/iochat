import { Injectable } from '@angular/core';

import { Observable, fromEvent } from 'rxjs';

import {
  IChatRoom,
  IRequestRoom,
  IDeleteMultipleRoom,
  IChatSocketResponse,
  IDeleteRoomsResponse,
  ISocketErrorResponse
} from '../chat';

import {
  WebsocketService
} from 'src/app/core/services';

import { environment } from 'src/environments/environment';



type RoomSocketResponse = IChatSocketResponse<
  IChatRoom | IChatRoom[]  | ISocketErrorResponse | IDeleteRoomsResponse
>;

@Injectable({
  providedIn: 'root'
})
export class RoomwebsocketService extends WebsocketService {

  wsUrl = `${environment.chatws}/rooms/`;
  rooms: IChatRoom[] = [];

  /**
   * [connect description]
   */
  connect(): void {
    const socket = new WebSocket(this.wsUrl);
    this.instance = socket;

    socket.onopen = (event) => {
      this.requestRooms();
      console.log('conected function', event);
    };

    socket.onclose = (event) => {
      console.log('disconected function', event);
    };

    this.observablemessage = fromEvent(socket, 'message');

    this.observablemessage.subscribe((val: MessageEvent) => {
      console.log('observable', val);
      console.log('observable', JSON.parse(val.data));
      const data: RoomSocketResponse = JSON.parse(val.data);
      this.roomEvents(data);
    });

  }

  /**
   * [requestRooms description]
   */
  requestRooms(): void {
    if (this.isConnected()) {
      const request: IRequestRoom = {
        method: 'R',
        token: this.auth.getAuthorizationToken(),
        values: { name: '-' }
      };
      this.instance.send(
        JSON.stringify(request)
      );
    } else {
      console.warn('socket is not connected');
    }
  }

  /**
   * [requestRooms description]
   */
  requestRamdomCreate(): void {
    if (this.isConnected()) {
      const id = Math.floor(Math.random() * 1000000);
      const request: IRequestRoom = {
        method: 'U',
        token: this.auth.getAuthorizationToken(),
        values: { name: `name_${id.toString()}` }
      };
      this.instance.send(
        JSON.stringify(request)
      );
    } else {
      console.warn('socket is not connected');
    }
  }

  /**
   * [requestCreate description]
   */
  requestCreate(roomName: string): void {
    if (this.isConnected()) {
      const request: IRequestRoom = {
        method: 'U',
        token: this.auth.getAuthorizationToken(),
        values: { name: roomName }
      };
      this.instance.send(
        JSON.stringify(request)
      );
    } else {
      console.warn('socket is not connected');
    }
  }

  /**
   * [requestRooms description]
   */
  deleteRooms(arrIds: number[]): void {
    if (this.isConnected()) {
      const request: IRequestRoom = {
        method: 'D',
        token: this.auth.getAuthorizationToken(),
        values: { pk_list: arrIds }
      };
      this.instance.send(
        JSON.stringify(request)
      );
    } else {
      console.warn('socket is not connected');
    }
  }

  /**
   * [getRooms description]
   */
  getRooms(): IChatRoom[] {
    return this.rooms;
  }

  /**
   * [roomEvents description]
   */
  roomEvents(response: RoomSocketResponse): void {
    switch (response.method) {

      case 'R':
        this.rooms = response.data as IChatRoom[];
        break;

      case 'U':
        const value = response.data as IChatRoom;
        const exist = this.rooms.map((room: IChatRoom) => {
          return room.id;
        }).includes(value.id);

        if (exist === false) {
          const temp = [...this.rooms];
          temp.push(value);
          this.rooms = temp;
        }

        break;

      case 'D':
        const result = response.data as IDeleteRoomsResponse;
        this.rooms = this.rooms.filter((room: IChatRoom) => {
          if (result.pk_list.includes(room.id) === false) {
            return room;
          }
        });
        break;

      default:
        // errors or exceptions
        // ...
        break;
    }
  }

}

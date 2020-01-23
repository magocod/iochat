import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  ChatwebsocketService,
  RoomwebsocketService,
  ChatRoom,
  ChatMessage,
  ChatSocketResponse,
} from 'src/app/chat/services';

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrls: ['./chat-dashboard.component.scss']
})
export class ChatDashboardComponent implements OnInit {

  // rooms: IChatRoom[] = [];
  roomdisplayedColumns: string[] = ['id', 'name', 'updated', 'action'];
  selected = 0;
  messagedisplayedColumns: string[] = [
    'id',
    'text',
    'updated',
    'room_id',
    'action'
  ];

  constructor(
    private chatwebsocketservice: ChatwebsocketService,
    private roomwebsocketservice: RoomwebsocketService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    // this.rooms = this.roomwebsocketservice.rooms;
  }

  /**
   * [requestRooms description]
   */
  requestRooms(): void {
    this.roomwebsocketservice.requestRooms();
  }

  /**
   * [requestMessages description]
   */
  requestMessages(): void {
    this.chatwebsocketservice.requestMessages(this.selected);
  }

  /**
   * [rooms description]
   */
  get rooms(): ChatRoom[] {
    // console.log(this.roomwebsocketservice.getRooms());
    return this.roomwebsocketservice.getRooms();
  }

  /**
   * [messages description]
   */
  get messages(): ChatMessage[] {
    // console.log(this.roomwebsocketservice.getRooms());
    return this.chatwebsocketservice.getMessages();
  }

  /**
   * [deleteRoom description]
   */
  deleteRoom(roomId: number, index: number): void {
    this.roomwebsocketservice.deleteRooms([roomId]);
  }

  /**
   * [ramdomCreate description]
   */
  ramdomRoomCreate(): void {
    this.roomwebsocketservice.requestRamdomCreate();
  }

  /**
   * [editUser description]
   */
  joinRoom(roomId: number): void {
    this.router.navigate([
      '/chat/room/',
      roomId
    ]);
  }

  /**
   * [deleteMessage description]
   */
  deleteMessage(messageId: number, index: number): void {
    this.chatwebsocketservice.deleteMessage(messageId);
  }

}

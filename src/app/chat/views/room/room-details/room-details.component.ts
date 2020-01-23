import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ChatwebsocketService,
  RoomwebsocketService,
  ChatMessage,
} from 'src/app/chat/services';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {

  createForm: any;
  roomId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private chatwebsocketservice: ChatwebsocketService,
    private roomwebsocketservice: RoomwebsocketService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.roomId = parseInt(params.get('roomId'), 10);
      // esperar unirse a la sala
      this.chatwebsocketservice.joinRoom(this.roomId);
      this.requestMessages(
        this.roomId
      );
    });
    this.createForm = this.formBuilder.group({
      text: new FormControl('', [Validators.required]),
    });
  }

  /**
   * [messages description]
   */
  get messages(): ChatMessage[] {
    // console.log(this.roomwebsocketservice.getRooms());
    return this.chatwebsocketservice.getMessages();
  }

  get text() {
    return this.createForm.get('text');
  }

  /**
   * [requestMessages description]
   */
  requestMessages(roomId: number): void {
    this.chatwebsocketservice.requestMessages(roomId);
  }

  /**
   * [deleteMessage description]
   */
  deleteMessage(messageId: number, index: number): void {
    this.chatwebsocketservice.deleteMessage(messageId);
  }

  /**
   * [onSubmit description]
   */
  onSubmit(): void {
    // Process checkout data here
    console.log(this.createForm.value);
    this.chatwebsocketservice.createMessage(
      this.createForm.value.text,
      this.roomId,
    );
    // this.createForm.reset();
  }

}

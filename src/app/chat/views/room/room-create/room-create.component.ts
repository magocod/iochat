import { Component, OnInit, Inject } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  RoomwebsocketService,
} from 'src/app/chat/services';

interface DialogData {
  title: string;
}

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

  /**
   * [openDialog description]
   */
  openDialog() {
    // pass
  }

}


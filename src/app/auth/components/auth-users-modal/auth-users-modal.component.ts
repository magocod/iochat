import { Component, OnInit } from '@angular/core';

import { NavParams, ModalController } from '@ionic/angular';

import { ICredentials } from '../../services';

/**
 *
 */
export interface IModalEvent {
  cancelled: boolean;
  user_index: number;
}

@Component({
  selector: 'app-auth-users-modal',
  templateUrl: './auth-users-modal.component.html',
  styleUrls: ['./auth-users-modal.component.scss'],
})
export class AuthUsersModalComponent implements OnInit {

  exampleusers: ICredentials[] = [
    { email: 'admin@django.com', password: '123' },
    { email: 'userstaff@django.com', password: '123' },
    { email: 'user@django.com', password: '123' },
  ];

  constructor(
    public navParams: NavParams,
    public modalController: ModalController
  ) { }

  ngOnInit() {}

  /**
   * [selected description]
   */
  selected(index: number): void {
    this.modalController.dismiss({
      cancelled: false,
      user_index: index
    } as IModalEvent);
  }

  /**
   * [dismiss description]
   */
  dismiss(): void {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      cancelled: true,
      user_index: 0
    } as IModalEvent);
  }

}

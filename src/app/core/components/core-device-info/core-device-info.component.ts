import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-core-device-info',
  templateUrl: './core-device-info.component.html',
  styleUrls: ['./core-device-info.component.scss'],
})
export class CoreDeviceInfoComponent implements OnInit {

  constructor(
  	public modalController: ModalController
  ) { }

  ngOnInit() {}

  /**
   * [dismiss description]
   */
  dismiss(): void {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }

}

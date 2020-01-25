import { Component, OnInit } from '@angular/core';

import { PhotoService, Photo } from '../../services';

import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-photo-base',
  templateUrl: './photo-base.component.html',
  styleUrls: ['./photo-base.component.scss'],
})
export class PhotoBaseComponent implements OnInit {

  title = 'Photo Gallery';

  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.photoService.loadSaved();
  }

  async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }

}

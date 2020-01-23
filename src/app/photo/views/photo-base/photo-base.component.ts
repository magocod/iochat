import { Component, OnInit } from '@angular/core';

import { PhotoService } from '../../services';

@Component({
  selector: 'app-photo-base',
  templateUrl: './photo-base.component.html',
  styleUrls: ['./photo-base.component.scss'],
})
export class PhotoBaseComponent implements OnInit {

  title = 'Photo Gallery';

  constructor(
    public photoService: PhotoService
  ) { }

  ngOnInit() {
    this.photoService.loadSaved();
  }

}

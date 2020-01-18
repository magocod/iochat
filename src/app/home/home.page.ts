import { Component } from '@angular/core';

import { PhotoService } from './services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public photoService: PhotoService
  ) { }

  ngOnInit() {
    this.photoService.loadSaved();
  }

}

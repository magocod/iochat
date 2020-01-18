import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoBaseComponent } from './views';

const routes: Routes = [
  {
    path: '',
    component: PhotoBaseComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PhotoRoutingModule { }

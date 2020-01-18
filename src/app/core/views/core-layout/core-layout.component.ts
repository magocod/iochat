import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-core-layout',
  templateUrl: './core-layout.component.html',
  styleUrls: ['./core-layout.component.scss'],
})
export class CoreLayoutComponent {

  public appPages = [
    {
      title: 'Photo',
      url: '/app/photo',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/app/list',
      icon: 'list'
    },
    {
      title: 'Users',
      url: '/app/users',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /**
   * [redirect description]
   */
  redirect(routeName: string): void {
    this.router.navigate([routeName]);
  }

}
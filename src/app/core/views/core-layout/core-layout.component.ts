import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {
  AuthService
} from 'src/app/auth';

import {
  DjangoUser
} from 'src/app/user';

/**
 *
 */
export interface SideBarItems {
  title: string;
  icon: string;
  url: string;
  is_superuser: boolean;
  permissions: any[];
}

@Component({
  selector: 'app-core-layout',
  templateUrl: './core-layout.component.html',
  styleUrls: ['./core-layout.component.scss'],
})
export class CoreLayoutComponent implements OnInit {

  appPages: SideBarItems[] = [];
  appAvailablePages: SideBarItems[] = [
    {
      title: 'Photo',
      url: '/app/photo',
      icon: 'camera',
      is_superuser: false,
      permissions: [],
    },
    // {
    //   title: 'List',
    //   url: '/app/list',
    //   icon: 'list',
    //   is_superuser: false,
    //   permissions: [],
    // },
    {
      title: 'Chat',
      url: '/app/chats',
      icon: 'chatbubbles',
      is_superuser: false,
      permissions: [],
    },
    {
      title: 'Users',
      url: '/app/users',
      icon: 'people',
      is_superuser: true,
      permissions: [],
    },
    {
      title: 'Profile',
      url: '/app/profile',
      icon: 'settings',
      is_superuser: false,
      permissions: [],
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async ngOnInit() {
    await this.userPages();
  }

  /**
   * [redirect description]
   */
  redirect(routeName: string): void {
    this.router.navigate([routeName]);
  }

  /**
   * [filterOptions description]
   */
  async userPages(): Promise<SideBarItems[]> {
    const user: DjangoUser = await this.auth.getUser();
    if (user.id === 0) {
      this.appPages = [];
      return [];
    }

    if (user.is_superuser) {
      this.appPages = this.appAvailablePages;
      return this.appAvailablePages;
    }

    // permissions
    const options = this.appAvailablePages.filter((value: SideBarItems) => {
      if (value.is_superuser === false) {
        return value;
      }
    });

    this.appPages = options;
    return options;
  }

}

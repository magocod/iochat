import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// auth
import {
  AuthLoginComponent,
  AuthProfileComponent,
  AuthGuard
} from 'src/app/auth';

// core
import {
  CoreLayoutComponent,
  PageNotFoundComponent
} from 'src/app/core';

const routes: Routes = [
  {
    path: '', component: AuthLoginComponent,
    data: {
      roles: [0],
      permissions: [0]
    },
  },
  {
    path: 'login', component: AuthLoginComponent,
    data: {
      roles: [0],
      permissions: [0]
    },
  },
  {
    path: 'app', component: CoreLayoutComponent,
    canActivateChild: [AuthGuard],
    data: {
      roles: [0],
      permissions: [0]
    },
    children: [
      {
        path: 'profile',
        component: AuthProfileComponent,
        data: {
          roles: [0],
          permissions: [0]
        },
      },
      {
        path: 'photo',
        loadChildren: () => import('./photo/photo.module').then(m => m.PhotoModule),
        data: {
          roles: [],
          permissions: []
        },
      },
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
        data: {
          roles: [],
          permissions: []
        },
      },
      {
        path: 'chats',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
        data: {
          roles: [],
          permissions: []
        },
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {
          roles: [],
          permissions: []
        },
      }
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

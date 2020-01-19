import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// auth
import { LoginComponent, AuthGuard } from 'src/app/user';

// core
import { CoreLayoutComponent } from 'src/app/core';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// auth
import { LoginComponent, AuthGuard } from 'src/app/user';

// core
import { CoreLayoutComponent } from 'src/app/core';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'app', component: CoreLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'photo',
        loadChildren: () => import('./photo/photo.module').then(m => m.PhotoModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
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

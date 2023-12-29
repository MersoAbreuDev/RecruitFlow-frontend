import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./component/login/login.module').then( m => m.LoginModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('./component/signup/signup.module').then( m => m.SignupModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/user/user.module').then( m => m.UserModule),
        canActivate:[AuthGuard]
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
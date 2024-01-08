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
      },
      {
        path: 'vaga',
        loadChildren: () => import('./pages/vagas/vaga.module').then( m => m.VagaModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'perfil',
        loadChildren: () => import('./pages/perfil-candidato/perfil-candidato.module').then( m => m.PerfilCandidatoModule),
        canActivate:[AuthGuard]
      },
      {
        path: 'avaliacao',
        loadChildren: () => import('./pages/avaliacao/avaliacao.module').then( m => m.AvaliacaoModule),
        canActivate:[AuthGuard]
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

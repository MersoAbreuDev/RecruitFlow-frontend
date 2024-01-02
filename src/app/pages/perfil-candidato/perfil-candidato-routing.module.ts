import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilCandidatoFormComponent } from './perfil-candidato-form/perfil-candidato-form.component';
import { PerfilCandidatoViewComponent } from './perfil-candidato-view/perfil-candidato-view.component';

const routes: Routes = [
    {
    path:"",
    component:PerfilCandidatoFormComponent
  },
  {
    path:"perfil-view",
    component:PerfilCandidatoViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilCandidatoRoutingModule { }

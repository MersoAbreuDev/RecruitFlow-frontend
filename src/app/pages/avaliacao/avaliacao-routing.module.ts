import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { CandidatoAvaliacaoComponent } from './candidato-avaliacao/candidato-avaliacao.component';

const routes: Routes = [
  {
    path: "",
    component:AvaliacaoComponent
  },
   {
    path: "candidato-avaliacao/:id",
    component:CandidatoAvaliacaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvaliacaoRoutingModule { }

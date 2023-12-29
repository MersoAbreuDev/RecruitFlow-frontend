import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VagaFormComponent } from './vaga-form/vaga-form.component';
import { VagaTableComponent } from './vaga-table/vaga-table.component';

const routes: Routes = [
  {
    path:"",
    component:VagaFormComponent
  },
  {
    path:"vaga-list",
    component:VagaTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VagaRoutingModule { }

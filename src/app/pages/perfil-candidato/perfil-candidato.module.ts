import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilCandidatoRoutingModule } from './perfil-candidato-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { PerfilCandidatoFormComponent } from './perfil-candidato-form/perfil-candidato-form.component';
import { PerfilCandidatoViewComponent } from './perfil-candidato-view/perfil-candidato-view.component';


@NgModule({
  declarations: [PerfilCandidatoFormComponent, PerfilCandidatoViewComponent],
  imports: [
    CommonModule,
    PerfilCandidatoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule
  ]
})
export class PerfilCandidatoModule { }

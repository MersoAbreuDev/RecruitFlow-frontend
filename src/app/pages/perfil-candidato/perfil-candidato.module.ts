import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilCandidatoRoutingModule } from './perfil-candidato-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { PerfilCandidatoFormComponent } from './perfil-candidato-form/perfil-candidato-form.component';
import { PerfilCandidatoViewComponent } from './perfil-candidato-view/perfil-candidato-view.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../../../interceptor/jwt-interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DirectiveModule } from '../../../shared/diretives/directives.module';


@NgModule({
  declarations: [PerfilCandidatoFormComponent, PerfilCandidatoViewComponent],
  imports: [
    CommonModule,
    PerfilCandidatoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    DirectiveModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],

})
export class PerfilCandidatoModule { }

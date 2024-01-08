import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VagaRoutingModule } from './vaga-routing.module';
import { VagaFormComponent } from './vaga-form/vaga-form.component';
import { VagaTableComponent } from './vaga-table/vaga-table.component';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../../../interceptor/jwt-interceptor';


@NgModule({
  declarations: [ VagaFormComponent, VagaTableComponent],
  imports: [
    CommonModule,
    VagaRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports:[
    VagaTableComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],

})
export class VagaModule { }

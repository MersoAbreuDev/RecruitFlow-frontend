import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VagaRoutingModule } from './vaga-routing.module';
import { VagaFormComponent } from './vaga-form/vaga-form.component';
import { VagaTableComponent } from './vaga-table/vaga-table.component';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class VagaModule { }

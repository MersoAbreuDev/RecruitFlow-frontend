import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserTableComponent } from './user-table/user-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    UserFormComponent,
    UserTableComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class UserModule { }

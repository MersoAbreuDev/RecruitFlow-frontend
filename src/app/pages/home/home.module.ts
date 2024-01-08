import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { VagaModule } from '../vagas/vaga.module';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    VagaModule

  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HomeModule { }

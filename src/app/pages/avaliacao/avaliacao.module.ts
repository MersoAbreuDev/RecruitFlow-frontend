import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvaliacaoRoutingModule } from './avaliacao-routing.module';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { CandidatoAvaliacaoComponent } from './candidato-avaliacao/candidato-avaliacao.component';
import { PrimengModule } from '../../../shared/primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AvaliacaoComponent, CandidatoAvaliacaoComponent],
  imports: [
    CommonModule,
    AvaliacaoRoutingModule,
    PrimengModule,
    ReactiveFormsModule,
    FormsModule
  ],
    providers:[MessageService],
})
export class AvaliacaoModule { }

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvaliarService } from '../../../../services/avaliar/avaliar.service';
import { IPerfilCandidato } from '../../../interface/IPerfilCandidato';
import { PerfilCandidatoService } from '../../../../services/perfil-candidato/perfil-candidato.service';

@Component({
  selector: 'app-candidato-avaliacao',
  templateUrl: './candidato-avaliacao.component.html',
  styleUrl: './candidato-avaliacao.component.scss'
})
export class CandidatoAvaliacaoComponent {
  candidatos!:any[];
  perfil!: IPerfilCandidato;
  visible: boolean = false;

  constructor(private route: ActivatedRoute,
              private avaliarService: AvaliarService,
              private perfilCandidato: PerfilCandidatoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.buscarCandidatosPorIdVaga(id);
    });

  }

  buscarCandidatosPorIdVaga(id: number) {
    this.avaliarService.buscarCandidatosPorIdVaga(id).subscribe((res:any) => {
      this.candidatos = res;
    })
  }


  perfilView(id:number) {
    this.perfilCandidato.buscarPerfilPorId(id)
      .subscribe((res) => {
        this.perfil = res;
      })
    this.showDialog();
  }

   showDialog() {
    this.visible = true;
  }
}

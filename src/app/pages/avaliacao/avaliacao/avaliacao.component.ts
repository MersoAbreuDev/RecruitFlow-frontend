import { Component } from '@angular/core';
import { IVaga } from '../../../interface/IVaga';
import { IPerfilCandidato } from '../../../interface/IPerfilCandidato';
import { LoginService } from '../../../../services/login/login.service';
import { PerfilControllerService } from '../../../controller/perfil-controller/perfil-controller.service';
import { HttpParams } from '@angular/common/http';
import { AvaliarService } from '../../../../services/avaliar/avaliar.service';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrl: './avaliacao.component.scss'
})
export class AvaliacaoComponent {
  visible: boolean = false;
  visibleFeed: boolean = false;
  vagas!: any[];
  feedbackSelecionado!: string;
  idCandidato: any | undefined;
  vagaSelecionadaId: number | null = null;
  requestOptions: any;
  role: string | null = null;
  perfil: IPerfilCandidato | null;
  constructor(
    private loginService: LoginService,
    private avaliarService: AvaliarService,
    private perfilControllerService: PerfilControllerService
  ) {
    this.perfil = null;
  }

  ngOnInit() {

    this.loginService.role$.subscribe((role) => {
      this.role = role;
    });

    this.perfilControllerService.perfil$.subscribe((perfil) => {
      this.perfil = perfil;
      this.idCandidato = this.perfil?.id;
    });

    let params = new HttpParams();
    params = params.append('pagina', 0);
    params = params.append('quantidade', 1000);
    params = params.append('ordem', "ASC");
    params = params.append('ordenarPor', "id");
    this.requestOptions = { params: params };
    const customFilterName = 'custom-equals';

   this.buscarVagaPorId(this.idCandidato);
  }

  isAuthorized(): boolean {
    return this.role !== undefined && this.role !== null && this.role === 'ADMIN';
  }

  isAuthorizedUser(): boolean {
    return this.role !== undefined && this.role !== null && this.role === 'USER';
  }

  showDialog(feed: string) {
    this.visible = true;
    this.feedbackSelecionado = feed;
  }

  closeDialog() {
    this.visible = false;
  }

  buscarVagaPorId(id: number) {
    this.avaliarService.buscarVagasPorId(id).subscribe((res:any) => {
      this.vagas = res;
    })
  }

}

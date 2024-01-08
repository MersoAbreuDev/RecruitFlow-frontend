import { Component } from '@angular/core';
import { VagaService } from '../../../../services/vaga/vaga.service';
import { HttpParams } from '@angular/common/http';
import { IVaga } from '../../../interface/IVaga';
import { LoginService } from '../../../../services/login/login.service';
import { ICandidatarRequest } from '../../../interface/ICandidatarRequest';
import { StatusCandidatoEnum } from '../../../enums/StatusCandidatoEnum';
import { IPerfilCandidato } from '../../../interface/IPerfilCandidato';
import { PerfilControllerService } from '../../../controller/perfil-controller/perfil-controller.service';
import { CandidatarService } from '../../../../services/candidatar/candidatar.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../services/utils/utils.service';

@Component({
  selector: 'app-vaga-table',
  templateUrl: './vaga-table.component.html',
  styleUrl: './vaga-table.component.scss'
})
export class VagaTableComponent {
  visible: boolean = false;
  candidato!: ICandidatarRequest;
  vagas!: IVaga[];
  vagaSelecionadaId: number | null = null;
  requestOptions:any;
  role: string | null = null;
  perfil!: IPerfilCandidato | null;
  constructor(
              private vagaService: VagaService,
    private loginService: LoginService,
              private router: Router,
              private candidatarService: CandidatarService,
              private perfilControllerService: PerfilControllerService,
              private utils:UtilsService
            ) {
              this.perfil = null;
            }

  ngOnInit() {
      this.loginService.role$.subscribe((role) => {
        this.role = role;
      });

      this.perfilControllerService.perfil$.subscribe((perfil) => {
        this.perfil = perfil;
      });

      let params = new HttpParams();
      params = params.append('pagina', 0);
      params = params.append('quantidade',1000);
      params = params.append('ordem', "ASC");
      params = params.append('ordenarPor', "id");
      this.requestOptions = { params: params };
      const customFilterName = 'custom-equals';
    this.buscarVagas();
  }

  createPayloadLogin()
  {
    return {
      idVaga: this.vagaSelecionadaId,
      idPerfilCandidato: this.perfil?.id,
      statusCandidato: StatusCandidatoEnum.CANDIDATO
   }
  }

  buscarVagas(){
    this.vagaService.buscarTodasVagas(this.requestOptions).subscribe((data:any) => this.vagas= data);
  }

  isAuthorized(): boolean {
    return this.role !== undefined && this.role !== null && this.role === 'ADMIN';
  }

  isAuthorizedUser(): boolean {
    return this.role !== undefined && this.role !== null && this.role === 'USER';
  }

  showDialog(id:number) {
    this.visible = true;
     this.vagaSelecionadaId = id;
  }

  closeDialog() {
    this.visible = false;
  }

  candidatar() {
    const payload = this.createPayloadLogin();
      this.candidatarService.candidatar(payload).subscribe((res) => {
        console.log(res);
        this.utils.showSuccess("Sucesso!");
        this.closeDialog();
    })
  }

  buscarVagaPorId(id: number) {
    this.vagaService.buscarVagaPorId(id).subscribe((res) => {
      this.vagas = res;
    })
  }

  navigateAvaliacao(id: number) {
    this.router.navigate(['avaliacao/candidato-avaliacao/', id]);
    console.log("Vaga id ",id)
  }
}

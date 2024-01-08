import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AvaliarService } from '../../../../services/avaliar/avaliar.service';
import { IPerfilCandidato } from '../../../interface/IPerfilCandidato';
import { PerfilCandidatoService } from '../../../../services/perfil-candidato/perfil-candidato.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IStatus } from '../../../interface/IStatus';
import { StatusCandidatoEnum } from '../../../enums/StatusCandidatoEnum';

interface Avaliacao {
  status: string;
  code: string;
}

@Component({
  selector: 'app-candidato-avaliacao',
  templateUrl: './candidato-avaliacao.component.html',
  styleUrl: './candidato-avaliacao.component.scss'
})
export class CandidatoAvaliacaoComponent {
  candidatos!:any[];
  perfil!: IPerfilCandidato;
  visible: boolean = false;
  visibleAvaliacao: boolean = false;
  status: IStatus[] | undefined;
  form!: FormGroup;
  id!: number;
  idCandidato!: number | undefined;
  selectedStatus: IStatus | undefined;

  constructor(private route: ActivatedRoute,
              private avaliarService: AvaliarService,
              private perfilCandidato: PerfilCandidatoService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.buscarCandidatosPorIdVaga(this.id);
    });

    this.status=[
      { status: 'CLASSIFICADO'},
      { status: 'DESCLASSIFICADO' }
    ]
    this.initForms();
  }

  initForms(){
    this.form = this.fb.group({
      feedback:['',[Validators.required]],
      status:['', [Validators.required]],
    })
  }

  getValueControl(form:FormGroup, control:string){
    return form.controls[control].value;
  }

  createPayloadLogin(
    idVaga = this.id,
    idCandidato = this.idCandidato,
    feedback = this.getValueControl(this.form, 'feedback'),
    status = this.getValueControl(this.form, 'status')
    )
  {
    const payload ={feedback, idVaga,idCandidato, status: status.status}

    return payload;
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
        this.idCandidato = this.perfil.id;
      })
    this.showDialog();
  }

  enviarFeedback() {
    const payload = this.createPayloadLogin();
      this.avaliarService.avaliar(payload).subscribe((res) => {
        console.log(res);
        this.closeDialogAvaliacao();
    })

  }

   showDialog() {
    this.visible = true;
  }

  showDialogAvaliacao() {
      this.visibleAvaliacao = true;
  }

  closeDialogAvaliacao() {
      this.visibleAvaliacao = false;
  }
}

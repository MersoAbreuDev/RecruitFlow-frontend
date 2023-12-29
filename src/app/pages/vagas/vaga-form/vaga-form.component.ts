import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VagaService } from '../../../../services/vaga/vaga.service';
import { IStatus } from '../../../interface/IStatus';

@Component({
  selector: 'app-vaga-form',
  templateUrl: './vaga-form.component.html',
  styleUrl: './vaga-form.component.scss'
})
export class VagaFormComponent {
  form!: FormGroup;
  status: IStatus[] | undefined;
  selectedStatus: IStatus | undefined;

  constructor(private fb: FormBuilder,
              private vagaService: VagaService,
              private router: Router){}



  ngOnInit(){
    this.status=[
      { status: 'ATIVA'},
      { status: 'CANCELADA' },
      { status: 'ANDAMENTO' },
      { status: 'FECHADA' },
      { status: 'REVISÃO' },
    ]
    this.initForms()
  }


  initForms(){
    this.form = this.fb.group({
      titulo:['',[Validators.required]],
      descricao:['',[Validators.required]],
      status:['', [Validators.required]],
    })
  }

  getValueControl(form:FormGroup, control:string){
    return form.controls[control].value;
  }

  createPayloadLogin(
    titulo = this.getValueControl(this.form, 'titulo'),
    descricao = this.getValueControl(this.form, 'descricao'),
    status = this.getValueControl(this.form, 'status'))
  {
    const payload ={titulo, descricao, status: status.status}

    return payload;
  }
  
  
  register(){
    if(this.isValidForm()){
      const {titulo} = this.createPayloadLogin();
      this.vagaService.salvar(this.createPayloadLogin())
      .subscribe((res:any)=>{
      
       this.limparFormulario();
      })
    }
  }

  isValidForm(){
    return this.form.valid;
  }

  limparFormulario() {
    this.form.reset({});
  }

}

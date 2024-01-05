import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login/login.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  form!: FormGroup;
  messages: Message[] = [];
  
  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router){}



  ngOnInit(){
    this.initForms()
  }


  initForms(){
    this.form = this.fb.group({
      nome:['',[Validators.required]],
      email:['',[Validators.required]],
      role:['ADMIN'],
      senha:['', [Validators.required]]
    })
  }

  getValueControl(form:FormGroup, control:string){
    return form.controls[control].value;
  }

  createPayloadLogin(
    email = this.getValueControl(this.form, 'email'),
    senha = this.getValueControl(this.form, 'senha'),
    role = this.getValueControl(this.form, 'role'),
    nome = this.getValueControl(this.form, 'nome'))
  {
    const payload ={email, senha, role, nome}

    return payload;
  }
  
  
  register(){
    if(this.isValidForm()){
      const {email} = this.createPayloadLogin();
      this.loginService.register(this.createPayloadLogin())
      .subscribe((res:any)=>{
        this.messages = [{ severity: 'success', summary: 'Usuário cadastrado com sucesso!' }];
        this.limparFormulario();
      })
    }else{
      this.messages = [{ severity: 'error', summary: 'Ocorreu um erro ao cadastrar.' }];
    }
  }

  isValidForm(){
    return this.form.valid;
  }

  limparFormulario() {
    this.form.reset({});
  }
}

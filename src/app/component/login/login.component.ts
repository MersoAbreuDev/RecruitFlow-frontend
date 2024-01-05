import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  messages: Message[] = [];
  
  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router){}



  ngOnInit(){
    this.initForms()
  }


  initForms(){
    this.form = this.fb.group({
      email:['',[Validators.required]],
      senha:['', [Validators.required]]
    })
  }

  getValueControl(form:FormGroup, control:string){
    return form.controls[control].value;
  }

  createPayloadLogin(
    email = this.getValueControl(this.form, 'email'),
    senha = this.getValueControl(this.form, 'senha'))
  {
    const payload ={email, senha}

    return payload;
  }
  
  
  login(){
    if(this.isValidForm()){
      const {email} = this.createPayloadLogin();
      this.loginService.login(this.createPayloadLogin())
      .subscribe((res:any)=>{
        let {token} = res;
        this.navigateURL('home');
      })
    }else{
      this.messages = [{ severity: 'error', summary: 'Login ou senha incorretos'}];
    }
  }

  isValidForm(){
    return this.form.valid;
  }

  navigateURL(url: string){
    this.router.navigate([`/${url}`])
  }

}

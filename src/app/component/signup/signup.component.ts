import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private localStorageService: LocalStorageService) { }



  ngOnInit(){
    this.initForms()
  }


  initForms(){
    this.form = this.fb.group({
      nome:['',[Validators.required]],
      email:['',[Validators.required]],
      role:['USER'],
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
        console.log(res);
        this.navigateURL('login');
      })
    }
  }

  isValidForm(){
    return this.form.valid;
  }

  navigateURL(url: string){
    this.router.navigate([`/${url}`])
  }

}

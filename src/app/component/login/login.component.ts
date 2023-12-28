import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  form!: FormGroup;

  constructor(private fb: FormBuilder)
  {}

  ngOnInit(){
    this.initForms()
  }


  initForms(){
    this.form = this.fb.group({
      login:['',[Validators.required]],
      password:['', [Validators.required]]
    })
  }

  login(){}

}

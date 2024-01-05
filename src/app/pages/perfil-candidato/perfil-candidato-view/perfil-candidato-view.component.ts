import { Component } from '@angular/core';
import { PerfilCandidatoService } from '../../../../services/perfil-candidato/perfil-candidato.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPerfilCandidato } from '../../../interface/IPerfilCandidato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil-candidato-view',
  templateUrl: './perfil-candidato-view.component.html',
  styleUrl: './perfil-candidato-view.component.scss'
})
export class PerfilCandidatoViewComponent {
  visible: boolean = false;
  idUser!: number;
  perfil!: IPerfilCandidato;
  requestOptions:any;
  form!: FormGroup;
  id!:number;
  imagemSelecionada: any | ArrayBuffer | null = null;
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  mensagem!:String;

  constructor(private perfilCandidatoService: PerfilCandidatoService, private fb: FormBuilder){
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  buscarPorId(){
    this.perfilCandidatoService.buscarPerfilPorId(this.id).subscribe((res)=>{
      this.perfil = res;
      this.mensagem = res.imagem;
    })
  }

  showDialog() {
    this.visible = true;
  }

  ngOnInit(){
    this.currentUser.subscribe((res:any)=>{
      this.id = res.id;
    });
    this.buscarPorId();
    this.initForms()
    this.currentUser.subscribe((res:any)=>{
      this.idUser = res;
    });

  }

  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagemSelecionada = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  initForms(){
    this.form = this.fb.group({
      nome:['',[Validators.required]],
      celular:['',[Validators.required]],
      email:['',[Validators.required]],
      link:['',[Validators.required]],
      rua:['',[Validators.required]],
      numero:['',[Validators.required]],
      bairro:['',[Validators.required]],
      cidade:['',[Validators.required]],
      uf:['',[Validators.required]],
      cep:['',[Validators.required]],
      imagem:[]
    })
  }

  getValueControl(form:FormGroup, control:string){
    return form.controls[control].value;
  }

  imagemPayload( imagemSelecionada = this.getValueControl(this.form, 'imagem')){
    const payloadImagem = {imagemSelecionada}
    return payloadImagem;
  }

  createPayloadPerfil() {
    const endereco = {
      rua: this.getValueControl(this.form, 'rua'),
      numero: this.getValueControl(this.form, 'numero'),
      bairro: this.getValueControl(this.form, 'bairro'),
      cidade: this.getValueControl(this.form, 'cidade'),
      uf: this.getValueControl(this.form, 'uf'),
      cep: this.getValueControl(this.form, 'cep')
    };
  
    const payload = {
      email: this.getValueControl(this.form, 'email'),
      link: this.getValueControl(this.form, 'link'),
      celular: this.getValueControl(this.form, 'celular'),
      nome: this.getValueControl(this.form, 'nome'),
      endereco,  
      imagem: "",
      usuario:this.idUser
    };
  
    return payload;
  }

  async convertImageToBase64(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const base64String = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    return `data:${response.headers.get('content-type')};base64,${base64String}`;
  }
  
  async register() {
    const imageUrl = this.imagemSelecionada;
    
    try {
      const base64Image = await this.convertImageToBase64(imageUrl);
  
      if (this.isValidForm()) {
        const payload = this.createPayloadPerfil();
        payload.imagem = base64Image; 
  
        this.perfilCandidatoService.salvar(payload)
          .subscribe((res: any) => {
            console.log(res);
            this.limparFormulario();
          });
      }
    } catch (error) {
      console.error('Erro ao converter imagem para base64:', error);
    }
  }
  

  isValidForm(){
    return this.form.valid;
  }

  limparFormulario() {
    this.form.reset({});
  }
}

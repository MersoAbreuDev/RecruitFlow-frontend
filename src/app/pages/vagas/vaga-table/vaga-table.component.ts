import { Component } from '@angular/core';
import { VagaService } from '../../../../services/vaga/vaga.service';
import { HttpParams } from '@angular/common/http';
import { IVaga } from '../../../interface/IVaga';
import { LoginService } from '../../../../services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vaga-table',
  templateUrl: './vaga-table.component.html',
  styleUrl: './vaga-table.component.scss'
})
export class VagaTableComponent {
  visibleEdit: boolean = false;
  visibleApply: boolean = false;
  vagas!: IVaga[];
  vaga!: IVaga;
  formEdit!: FormGroup;
  id!:number;
  requestOptions:any;
  role: string | null = null;
  constructor(
              private vagaService: VagaService,
              private loginService: LoginService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.loginService.role$.subscribe((role) => {
      this.role = role;
    });

      let params = new HttpParams();
      params = params.append('pagina', 0);
      params = params.append('quantidade',1000);
      params = params.append('ordem', "ASC");
      params = params.append('ordenarPor', "id");
      this.requestOptions = { params: params };
      const customFilterName = 'custom-equals';

      // this.filterService.register(customFilterName, (value:any, filter:any): boolean => {
      //     if (filter === undefined || filter === null || filter.trim() === '') {
      //         return true;
      //     }

      //     if (value === undefined || value === null) {
      //         return false;
      //     }

      //     return value.toString() === filter.toString();
      // });

      // this.cols = [
      //     { field: 'nome', header: 'Nome' },
      //     { field: 'dosagem', header: 'Dosagem' },
      // ];

      // this.matchModeOptions = [
      //     { label: 'Igual', value: customFilterName },
      //     { label: 'Começa com', value: FilterMatchMode.STARTS_WITH },
      //     { label: 'Contém', value: FilterMatchMode.CONTAINS }
      // ];

       //this.carService.getCarsMedium().then((data:any) => (this.medicamentos = data));

    this.buscarUsuarios();
    this.initForms();
    this.buscarPorId();
  }

  initForms(){
    this.formEdit = this.fb.group({
      titulo:['',[Validators.required]],
      descricao:['',[Validators.required]],
      status:['', [Validators.required]],
    })
  }

  buscarUsuarios(){
    this.vagaService.buscarTodasVagas(this.requestOptions).subscribe((data:any) => this.vagas= data);
  }

  buscarPorId(){
    this.vagaService.buscarVagaPorId(this.id).subscribe((res)=>{
      this.vaga = res;
    })
  }

  editar(){
    alert("Editar")
  }

  excluir(){
    alert("Excluir")
  }

  showDialogEdit() {
    this.visibleEdit = true;
  }

  closeDialogEdit() {
    this.visibleEdit = false;
  }

  
  isAuthorized(): boolean {
    return this.role !== undefined && this.role !== null && this.role === 'ADMIN';
  }

  showDialogApply() {
      this.visibleApply = true;
  }

  closeDialogApply() {
      this.visibleApply = false;
  }

  atualizarVaga(){
    
  }
  
}

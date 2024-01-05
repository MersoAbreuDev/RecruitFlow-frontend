import { Component } from '@angular/core';
import { VagaService } from '../../../../services/vaga/vaga.service';
import { HttpParams } from '@angular/common/http';
import { IVaga } from '../../../interface/IVaga';
import { LoginService } from '../../../../services/login/login.service';

@Component({
  selector: 'app-vaga-table',
  templateUrl: './vaga-table.component.html',
  styleUrl: './vaga-table.component.scss'
})
export class VagaTableComponent {
  visible: boolean = false;
  vagas!: IVaga[];
  requestOptions:any;
  role: string | null = null;
  constructor(
              private vagaService: VagaService,
              private loginService: LoginService) {}

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
  }

  buscarUsuarios(){
    this.vagaService.buscarTodasVagas(this.requestOptions).subscribe((data:any) => this.vagas= data);
  }

  editar(){
    alert("Editar")
  }
  excluir(){
    alert("Excluir")
  }

  modal(){
    alert("Chamou")
  }

  
  isAuthorized(): boolean {
    return this.role !== undefined && this.role !== null && this.role === 'ADMIN';
  }

  showDialog() {
      this.visible = true;
  }

  closeDialog() {
      this.visible = false;
  }
  
}

import { Component } from '@angular/core';
import { LoginService } from '../../../../services/login/login.service';
import { HttpParams } from '@angular/common/http';
import { IUsuario } from '../../../interface/IUsuario';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  usuarios!: IUsuario[];
  requestOptions:any;

  // matchModeOptions: SelectItem[] | undefined;

  constructor(
              private loginService: LoginService) {}

  ngOnInit() {
      let params = new HttpParams();
      params = params.append('pagina', 0);
      params = params.append('quantidade',1000);
      params = params.append('ordem', "ASC");
      params = params.append('ordenarPor', "nome");
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
    this.loginService.buscarTodos(this.requestOptions).subscribe((data:any) => this.usuarios= data);
  }

  editar(){
    alert("Editar")
  }
  excluir(){
    alert("Excluir")
  }

}

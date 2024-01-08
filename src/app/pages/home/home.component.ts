import { Component, Input, OnInit } from '@angular/core';
import { PerfilCandidatoService } from '../../../services/perfil-candidato/perfil-candidato.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPerfilCandidato } from '../../interface/IPerfilCandidato';
import { PerfilControllerService } from '../../controller/perfil-controller/perfil-controller.service';
import { LoginService } from '../../../services/login/login.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  perfil!: IPerfilCandidato;
  id!: number;
  mostrarElemento!: boolean;
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  role: string | null = null;
  constructor(private perfilCandidatoService: PerfilCandidatoService,
    private loginService: LoginService,
              private utilsService: UtilsService,
              private perfilController: PerfilControllerService,
             ) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
      this.currentUser = this.currentUserSubject.asObservable();
    }

  buscarPorId(){
    this.perfilCandidatoService.buscarPerfilPorId(this.id).subscribe((res)=>{
      this.perfil = res;
      this.perfilController.setPerfil(this.perfil);
      if (this.perfil == null || Object.keys(this.perfil).length === 0) {
        this.mostrarElemento = false;
        } else {
        this.mostrarElemento = true;
      }
    })
  }

  ngOnInit() {
    this.currentUser.subscribe((res:any)=>{
      this.id = res.id;
    });
    this.buscarPorId();
    this.loginService.role$.subscribe((role) => {
        this.role = role;
    });

  }

    isAuthorizedUser(): boolean {
    return this.role !== undefined && this.role !== null && this.role === 'USER';
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { PerfilCandidatoService } from '../../../services/perfil-candidato/perfil-candidato.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPerfilCandidato } from '../../interface/IPerfilCandidato';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  perfil!: IPerfilCandidato;
  id!:number;
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private perfilCandidatoService: PerfilCandidatoService){
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
      this.currentUser = this.currentUserSubject.asObservable();
    }

  buscarPorId(){
    this.perfilCandidatoService.buscarPerfilPorId(this.id).subscribe((res)=>{
      this.perfil = res;
    })
  }
  ngOnInit(){
    this.currentUser.subscribe((res:any)=>{
      this.id = res.id;
    });
    this.buscarPorId();
  }
}

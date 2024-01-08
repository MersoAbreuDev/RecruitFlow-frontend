import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { SERVER_URI } from '../../server/server';
import { IPerfilCandidato } from '../../app/interface/IPerfilCandidato';
import { UtilsService } from '../utils/utils.service';


@Injectable({
  providedIn: 'root'
})
export class PerfilCandidatoService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private utilsService: UtilsService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): any {
    return this.currentUserSubject.getValue();
  }

  salvar(data: any): Observable<any> {
    return this.http.post(`${SERVER_URI}perfil-candidatos`,data)
      .pipe(map((data: any) => {
        this.currentUserSubject.next(data);
        this.utilsService.showSuccess("Cadastrado com sucesso!");
        return data;
      }),
      catchError((err) => {
        if (err.status === 403 || err.status === 500) {
          this.utilsService.showError("Erro de login ou senha!");
        } else if (err.status === 404) {
          this.utilsService.showError(err.error.message);
        } else if (err.status === 0 && err.status !== 404) {
          this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente mais tarde!');
        } else {
          this.utilsService.showError("Ocorreu um erro no servidor, tente mais tarde!");
        }
        return throwError(() => err);
      }));
  }

  atualizarPerfil(id: number, data: any): Observable<IPerfilCandidato> {
    console.log("ID: ", id, " Data: ", data)
    return this.http.put(`${SERVER_URI}perfil-candidatos/${id}`, data)
      .pipe(map((data: any) => {
        this.currentUserSubject.next(data);
        return data;
      }));
  }

  buscarPerfilPorId(id:number): Observable<any> {
    return this.http.get(`${SERVER_URI}perfil-candidatos/buscar-candidato-id/${id}`)
    .pipe(map((data: any) => {
      this.currentUserSubject.next(data);
      return data;
    }))
    .pipe(
      catchError((error: any) => {
        console.log('Erro na requisição:', error);
        return throwError(error);
      })
    );
  }

    buscarPorId(id:number): Observable<any> {
    return this.http.get(`${SERVER_URI}perfil-candidatos/buscar-candidato/${id}`)
    .pipe(map((data: any) => {
      this.currentUserSubject.next(data);
      return data;
    }))
    .pipe(
      catchError((error: any) => {
        console.log('Erro na requisição:', error);
        return throwError(error);
      })
    );
  }

}

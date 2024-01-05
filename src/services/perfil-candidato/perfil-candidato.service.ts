import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { SERVER_URI } from '../../server/server';

@Injectable({
  providedIn: 'root'
})
export class PerfilCandidatoService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) { 
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
        return data;
      }));
  }

  atualizarPerfil(id: number, data: any): Observable<any> {
    return this.http.put(`${SERVER_URI}perfil-candidatos/${id}`, data)
      .pipe(map((data: any) => {
        this.currentUserSubject.next(data);
        return data;
      }));
  }

  buscarPerfilPorId(id:number): Observable<any> {
    return this.http.get(`${SERVER_URI}perfil-candidatos/buscar/${id}`)
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

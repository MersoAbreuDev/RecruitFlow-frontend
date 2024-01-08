import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { SERVER_URI } from '../../server/server';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private utilsService: UtilsService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '/*'
    })
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.getValue();
  }
salvar(vaga: any): Observable<any> {
  return this.http.post(`${SERVER_URI}vagas`, vaga)
    .pipe(
      map((data: any) => {
        this.currentUserSubject.next(data);
        this.utilsService.showSuccess("Vaga cadastrada com sucesso!");
        return data;
      }),
      catchError((err) => {
        if (err.status === 403 || err.status === 500) {
          this.utilsService.showError("Erro de login ou senha!");
        } else if (err.status === 404) {
          this.utilsService.showError(err.error.message);
        } else if (err.status === 0 && err.status !== 404) {
          this.utilsService.showError('Ocorreu um erro na aplicação, tente novamente mais tarde!');
        }
        return throwError(() => err);
      })
    );
}

  buscarTodasVagas(data: any): Observable<any> {
    return this.http.get(`${SERVER_URI}vagas`, data).pipe(map((data: any) => {
      this.currentUserSubject.next(data);
      return data;
    }));;
  }

  atualizarVaga(id: number, data: any): Observable<any> {
    return this.http.put(`${SERVER_URI}vagas/${id}`, data)
      .pipe(map((data: any) => {
        this.currentUserSubject.next(data);
        return data;
      }));
  }

  deletarVaga(id: number): Observable<any> {
    return this.http.delete(`${SERVER_URI}vagas/${id}`)
      .pipe(map((data: any) => {
        this.currentUserSubject.next(data);
        return data;
      }))
  }

  buscarVagaPorId(id: number): Observable<any> {
    return this.http.get(`${SERVER_URI}vagas/${id}`).pipe(map((data: any) => {
      this.currentUserSubject.next(data);
      return data;
    }));;
  }
}

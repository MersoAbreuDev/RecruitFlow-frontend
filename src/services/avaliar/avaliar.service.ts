import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { SERVER_URI } from '../../server/server';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class AvaliarService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private utilsService: UtilsService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): any {
    return this.currentUserSubject.getValue();
  }

  buscarVagasPorId(id: number): Observable<any> {
    return this.http.get(`${SERVER_URI}candidatar/minhas-candidaturas/${id}`)
      .pipe(map((data: any) => {
        this.currentUserSubject.next(data);
        return data;
      }));
  }

    buscarCandidatosPorIdVaga(id: number): Observable<any> {
    return this.http.get(`${SERVER_URI}candidatar/candidatos-por-vaga/${id}`)
      .pipe(map((data: any) => {
        this.currentUserSubject.next(data);
        return data;
      }));
    }

  avaliar(data: any): Observable<any> {
    return this.http.post(`${SERVER_URI}candidatar/avaliar`,data).pipe(
      map(data => {
        this.currentUserSubject.next(data);
        this.utilsService.showSuccess("Candidatura realizada com Sucesso");
        return data;
      }),
      catchError((err) => {
        if (err.status === 403) {
          this.utilsService.showError("Não Autorizado!");
        } else if (err.status === 404) {
          this.utilsService.showError("Não permitido, verifique as informações!");
        } else if (err.status === 500) {
          this.utilsService.showError(err.error.message);
        } else if (err.error.status === 404) {
          this.utilsService.showError("Atualize seu perfil para se candidatar as vagas!");
        }
        return throwError(() => err);
      })
    );

  }
}

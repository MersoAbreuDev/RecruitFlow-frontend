import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { SERVER_URI } from '../../server/server';

@Injectable({
  providedIn: 'root'
})
export class AvaliarService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): any {
    return this.currentUserSubject.getValue();
  }

  buscarVagasPorId(id: any): Observable<any> {
    return this.http.get(`${SERVER_URI}candidatar/minhas-candidaturas/${id}`)
      .pipe(map((data: any) => {
        this.currentUserSubject.next(data);
        return data;
      }));
  }

}

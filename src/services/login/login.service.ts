import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { UtilsService } from '../utils/utils.service';
import { SERVER_URI } from '../../server/server';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  returnUrl:string="";

    constructor(private http: HttpClient, private router : Router,
                private utilsService: UtilsService) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.getValue();
  }

  login(usuario:any) {
      return this.http.post<any>(`${SERVER_URI}api/v1/auth/authenticate`, usuario).pipe(catchError((err)=>{
        if(err.status !== 200){
            this.utilsService.showError("Erro ao com servidor, tente mais tarde!")
        }
        return throwError(()=> err)
      })
      ).pipe(map(data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
            this.currentUserSubject.next(data);
            return data;
        }));
   } 

   buscarTodos(data: any): Observable<any[]> {
    return this.http.get(`${SERVER_URI}api/v1/auth/user`,data).pipe(map((data: any) => {
      this.currentUserSubject.next(data);
      return data;
    }));;
  }

   register(usuario:any) {
    return this.http.post<any>(`${SERVER_URI}api/v1/auth/register`, usuario).pipe(catchError((err)=>{
      if(err.status !== 200){
          this.utilsService.showError("Erro ao com servidor, tente mais tarde!")
      }
      return throwError(()=> err)
    })
    ).pipe(map(data => {
      localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
      }));
  } 

   logout() {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('username');
      this.router.navigate(['login']);
    }

    setUserName(login:string): void{
        localStorage.setItem('username', JSON.stringify(login));
    }

    getUserName(){
        return JSON.parse(localStorage.getItem('login')!);
    }

    esqueciMinhaSenha(login:string):Observable<any>{
        return this.http.post(`${SERVER_URI}usuarios/forgot_password`, login)
    }
}

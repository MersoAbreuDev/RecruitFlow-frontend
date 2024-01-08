import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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
  private roleSubject = new BehaviorSubject<string | null>('');
  role$: Observable<string | null> = this.roleSubject.asObservable();
  private isAuthenticated = new BehaviorSubject<boolean>(false)
  mostrarMenuEmitter = new EventEmitter<boolean>();

    constructor(private http: HttpClient,
                private router : Router,
                private utilsService: UtilsService,

               ) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();

    }

    public get currentUserValue(): any {
        return this.currentUserSubject.getValue();
    }

  get isAuthenticated$() {
    if(localStorage.getItem('currentUser')!=null){
      this.isAuthenticated.next(true);
    }
    return this.isAuthenticated.asObservable();
  }

  login(usuario: any) {
    return this.http.post<any>(`${SERVER_URI}api/v1/auth/authenticate`, usuario).pipe(
      map(data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        this.isAuthenticated.next(true);
        this.setRole(data.role);
        this.utilsService.showSuccess("Login realizado com sucesso!");
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
      })
    );
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
    this.isAuthenticated.next(false);
    this.setRole(null);
    this.router.navigate(['login']);
    }

    buscarTodos(data: any): Observable<any> {
      return this.http.get(`${SERVER_URI}api/v1/auth/buscar-todos`, data).pipe(map((data: any) => {
        this.currentUserSubject.next(data);
        return data;
      }));;
    }


    setUserName(login:string): void{
        localStorage.setItem('username', JSON.stringify(login));
    }

    getUserName(){
        return JSON.parse(localStorage.getItem('login')!);
    }

    setRole(role: string | null) {
      this.roleSubject.next(role);
    }

    getRole(): string | null {
      return this.roleSubject.getValue();
    }
}

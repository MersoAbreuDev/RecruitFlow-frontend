import { Injectable } from '@angular/core';
import { IPerfilCandidato } from '../../interface/IPerfilCandidato';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilControllerService {
private perfilSubject: BehaviorSubject<IPerfilCandidato | null> = new BehaviorSubject<IPerfilCandidato | null>(null);
  public perfil$: Observable<IPerfilCandidato | null> = this.perfilSubject.asObservable();

  setPerfil(perfil: IPerfilCandidato | null): void {
    this.perfilSubject.next(perfil);
  }


}

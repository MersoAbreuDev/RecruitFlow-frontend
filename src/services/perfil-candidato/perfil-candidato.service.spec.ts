import { TestBed } from '@angular/core/testing';

import { PerfilCandidatoService } from './perfil-candidato.service';

describe('PerfilCandidatoService', () => {
  let service: PerfilCandidatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilCandidatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

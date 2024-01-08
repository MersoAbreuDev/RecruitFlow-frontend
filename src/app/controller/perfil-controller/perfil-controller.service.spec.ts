import { TestBed } from '@angular/core/testing';

import { PerfilControllerService } from './perfil-controller.service';

describe('PerfilControllerService', () => {
  let service: PerfilControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

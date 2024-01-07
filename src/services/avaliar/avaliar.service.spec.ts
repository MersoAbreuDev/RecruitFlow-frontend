import { TestBed } from '@angular/core/testing';

import { AvaliarService } from './avaliar.service';

describe('AvaliarService', () => {
  let service: AvaliarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

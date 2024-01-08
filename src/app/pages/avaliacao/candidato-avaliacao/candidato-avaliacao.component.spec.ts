import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoAvaliacaoComponent } from './candidato-avaliacao.component';

describe('CandidatoAvaliacaoComponent', () => {
  let component: CandidatoAvaliacaoComponent;
  let fixture: ComponentFixture<CandidatoAvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatoAvaliacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidatoAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

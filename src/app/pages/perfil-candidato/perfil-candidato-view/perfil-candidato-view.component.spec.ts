import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCandidatoViewComponent } from './perfil-candidato-view.component';

describe('PerfilCandidatoViewComponent', () => {
  let component: PerfilCandidatoViewComponent;
  let fixture: ComponentFixture<PerfilCandidatoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilCandidatoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilCandidatoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

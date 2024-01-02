import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilCandidatoFormComponent } from './perfil-candidato-form.component';

describe('PerfilCandidatoFormComponent', () => {
  let component: PerfilCandidatoFormComponent;
  let fixture: ComponentFixture<PerfilCandidatoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilCandidatoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilCandidatoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

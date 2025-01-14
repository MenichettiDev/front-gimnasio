import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboFrecuenciaComponent } from './cbo-frecuencia.component';

describe('CboFrecuenciaComponent', () => {
  let component: CboFrecuenciaComponent;
  let fixture: ComponentFixture<CboFrecuenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboFrecuenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboFrecuenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

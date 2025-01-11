import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFrecuenciaComponent } from './crear-frecuencia.component';

describe('CrearFrecuenciaComponent', () => {
  let component: CrearFrecuenciaComponent;
  let fixture: ComponentFixture<CrearFrecuenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearFrecuenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearFrecuenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

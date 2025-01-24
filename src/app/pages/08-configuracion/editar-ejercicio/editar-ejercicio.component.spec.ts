import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEjercicioComponent } from './editar-ejercicio.component';

describe('EditarEjercicioComponent', () => {
  let component: EditarEjercicioComponent;
  let fixture: ComponentFixture<EditarEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEjercicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

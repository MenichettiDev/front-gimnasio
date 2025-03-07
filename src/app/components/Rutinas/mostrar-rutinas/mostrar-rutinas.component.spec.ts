import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRutinasComponent } from './mostrar-rutinas.component';

describe('MostrarRutinasComponent', () => {
  let component: MostrarRutinasComponent;
  let fixture: ComponentFixture<MostrarRutinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRutinasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

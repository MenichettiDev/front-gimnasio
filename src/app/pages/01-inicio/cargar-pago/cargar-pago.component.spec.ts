import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarPagoComponent } from './cargar-pago.component';

describe('CargarPagoComponent', () => {
  let component: CargarPagoComponent;
  let fixture: ComponentFixture<CargarPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

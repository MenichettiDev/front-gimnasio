import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarAtletaComponent } from './cargar-atleta.component';

describe('CargarAtletaComponent', () => {
  let component: CargarAtletaComponent;
  let fixture: ComponentFixture<CargarAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarAtletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

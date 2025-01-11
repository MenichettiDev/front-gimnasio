import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarNuevoComponent } from './cargar-nuevo.component';

describe('CargarNuevoComponent', () => {
  let component: CargarNuevoComponent;
  let fixture: ComponentFixture<CargarNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

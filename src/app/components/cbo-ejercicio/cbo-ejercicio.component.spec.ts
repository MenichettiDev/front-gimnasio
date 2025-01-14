import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboEjercicioComponent } from './cbo-ejercicio.component';

describe('CboEjercicioComponent', () => {
  let component: CboEjercicioComponent;
  let fixture: ComponentFixture<CboEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboEjercicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

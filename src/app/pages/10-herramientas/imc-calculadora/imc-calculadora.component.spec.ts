import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImcCalculadoraComponent } from './imc-calculadora.component';

describe('ImcCalculadoraComponent', () => {
  let component: ImcCalculadoraComponent;
  let fixture: ComponentFixture<ImcCalculadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImcCalculadoraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImcCalculadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

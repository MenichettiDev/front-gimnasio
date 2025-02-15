import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboFormaPagoComponent } from './cbo-forma-pago.component';

describe('CboFormaPagoComponent', () => {
  let component: CboFormaPagoComponent;
  let fixture: ComponentFixture<CboFormaPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboFormaPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboFormaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

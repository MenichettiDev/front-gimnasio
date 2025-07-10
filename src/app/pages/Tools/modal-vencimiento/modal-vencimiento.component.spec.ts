import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVencimientoComponent } from './modal-vencimiento.component';

describe('ModalVencimientoComponent', () => {
  let component: ModalVencimientoComponent;
  let fixture: ComponentFixture<ModalVencimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVencimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVencimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtFechaComponent } from './txt-fecha.component';

describe('TxtFechaComponent', () => {
  let component: TxtFechaComponent;
  let fixture: ComponentFixture<TxtFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TxtFechaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TxtFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

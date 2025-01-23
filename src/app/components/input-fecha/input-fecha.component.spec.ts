import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFechaComponent } from './input-fecha.component';

describe('InputFechaComponent', () => {
  let component: InputFechaComponent;
  let fixture: ComponentFixture<InputFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFechaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

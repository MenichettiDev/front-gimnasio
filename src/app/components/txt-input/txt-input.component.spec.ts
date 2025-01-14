import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtInputComponent } from './txt-input.component';

describe('TxtInputComponent', () => {
  let component: TxtInputComponent;
  let fixture: ComponentFixture<TxtInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TxtInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TxtInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

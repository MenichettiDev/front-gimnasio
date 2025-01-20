import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeticionComponent } from './repeticion.component';

describe('RepeticionComponent', () => {
  let component: RepeticionComponent;
  let fixture: ComponentFixture<RepeticionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepeticionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

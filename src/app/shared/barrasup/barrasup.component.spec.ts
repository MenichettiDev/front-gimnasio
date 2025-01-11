import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrasupComponent } from './barrasup.component';

describe('BarrasupComponent', () => {
  let component: BarrasupComponent;
  let fixture: ComponentFixture<BarrasupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarrasupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarrasupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularesComponent } from './populares.component';

describe('PopularesComponent', () => {
  let component: PopularesComponent;
  let fixture: ComponentFixture<PopularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

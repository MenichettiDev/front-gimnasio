import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEdicionComponent } from './test-edicion.component';

describe('TestEdicionComponent', () => {
  let component: TestEdicionComponent;
  let fixture: ComponentFixture<TestEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestEdicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

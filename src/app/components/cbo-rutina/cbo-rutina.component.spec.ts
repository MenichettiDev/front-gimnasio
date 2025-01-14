import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboRutinaComponent } from './cbo-rutina.component';

describe('CboRutinaComponent', () => {
  let component: CboRutinaComponent;
  let fixture: ComponentFixture<CboRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboRutinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

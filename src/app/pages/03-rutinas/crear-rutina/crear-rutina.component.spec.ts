import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRutinaComponent } from './crear-rutina.component';

describe('CrearRutinaComponent', () => {
  let component: CrearRutinaComponent;
  let fixture: ComponentFixture<CrearRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRutinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

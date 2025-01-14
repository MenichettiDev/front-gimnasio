import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboNiveldificultadComponent } from './cbo-niveldificultad.component';

describe('CboNiveldificultadComponent', () => {
  let component: CboNiveldificultadComponent;
  let fixture: ComponentFixture<CboNiveldificultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboNiveldificultadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboNiveldificultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

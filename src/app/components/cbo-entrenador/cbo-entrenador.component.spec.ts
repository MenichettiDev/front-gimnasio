import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboEntrenadorComponent } from './cbo-entrenador.component';

describe('CboEntrenadorComponent', () => {
  let component: CboEntrenadorComponent;
  let fixture: ComponentFixture<CboEntrenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboEntrenadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

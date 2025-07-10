import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroGimnasioComponent } from './registro-gimnasio.component';

describe('RegistroGimnasioComponent', () => {
  let component: RegistroGimnasioComponent;
  let fixture: ComponentFixture<RegistroGimnasioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroGimnasioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroGimnasioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

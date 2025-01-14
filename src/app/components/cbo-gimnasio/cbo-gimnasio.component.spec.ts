import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboGimnasioComponent } from './cbo-gimnasio.component';

describe('CboGimnasioComponent', () => {
  let component: CboGimnasioComponent;
  let fixture: ComponentFixture<CboGimnasioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboGimnasioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboGimnasioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboMembresiaComponent } from './cbo-membresia.component';

describe('CboMembresiaComponent', () => {
  let component: CboMembresiaComponent;
  let fixture: ComponentFixture<CboMembresiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboMembresiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

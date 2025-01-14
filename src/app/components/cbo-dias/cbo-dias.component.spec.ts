import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboDiasComponent } from './cbo-dias.component';

describe('CboDiasComponent', () => {
  let component: CboDiasComponent;
  let fixture: ComponentFixture<CboDiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboDiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

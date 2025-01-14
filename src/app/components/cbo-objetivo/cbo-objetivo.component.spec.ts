import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboObjetivoComponent } from './cbo-objetivo.component';

describe('CboObjetivoComponent', () => {
  let component: CboObjetivoComponent;
  let fixture: ComponentFixture<CboObjetivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboObjetivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboObjetivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboAtletaComponent } from './cbo-atleta.component';

describe('CboAtletaComponent', () => {
  let component: CboAtletaComponent;
  let fixture: ComponentFixture<CboAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboAtletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

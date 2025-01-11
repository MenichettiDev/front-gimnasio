import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecificasComponent } from './especificas.component';

describe('EspecificasComponent', () => {
  let component: EspecificasComponent;
  let fixture: ComponentFixture<EspecificasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecificasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecificasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

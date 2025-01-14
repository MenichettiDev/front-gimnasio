import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RbEstadoComponent } from './rb-estado.component';

describe('RbEstadoComponent', () => {
  let component: RbEstadoComponent;
  let fixture: ComponentFixture<RbEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RbEstadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RbEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

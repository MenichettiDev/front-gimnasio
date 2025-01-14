import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboMenuComponent } from './cbo-menu.component';

describe('CboMenuComponent', () => {
  let component: CboMenuComponent;
  let fixture: ComponentFixture<CboMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritasComponent } from './favoritas.component';

describe('FavoritasComponent', () => {
  let component: FavoritasComponent;
  let fixture: ComponentFixture<FavoritasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

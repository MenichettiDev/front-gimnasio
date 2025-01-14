import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboPerfilComponent } from './cbo-perfil.component';

describe('CboPerfilComponent', () => {
  let component: CboPerfilComponent;
  let fixture: ComponentFixture<CboPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

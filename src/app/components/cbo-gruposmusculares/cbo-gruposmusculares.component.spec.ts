import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CboGruposmuscularesComponent } from './cbo-gruposmusculares.component';

describe('CboGruposmuscularesComponent', () => {
  let component: CboGruposmuscularesComponent;
  let fixture: ComponentFixture<CboGruposmuscularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CboGruposmuscularesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CboGruposmuscularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

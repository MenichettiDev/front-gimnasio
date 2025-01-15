import { TestBed } from '@angular/core/testing';

import { GruposMuscularesService } from './grupos-musculares.service';

describe('GruposMuscularesService', () => {
  let service: GruposMuscularesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruposMuscularesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

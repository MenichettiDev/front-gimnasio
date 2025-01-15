import { TestBed } from '@angular/core/testing';

import { NivelDificultadService } from './nivel-dificultad.service';

describe('NivelDificultadService', () => {
  let service: NivelDificultadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NivelDificultadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FrecuenciaService } from './frecuencia.service';

describe('FrecuenciaService', () => {
  let service: FrecuenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrecuenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

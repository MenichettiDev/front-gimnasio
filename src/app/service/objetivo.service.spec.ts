import { TestBed } from '@angular/core/testing';

import { ObjetivoService } from './objetivo.service';

describe('ObjetivoService', () => {
  let service: ObjetivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DiasService } from './dias.service';

describe('DiasService', () => {
  let service: DiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

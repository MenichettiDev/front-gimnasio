import { TestBed } from '@angular/core/testing';

import { GimnasioService } from './gimnasio.service';

describe('GimnasioService', () => {
  let service: GimnasioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GimnasioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

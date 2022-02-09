import { TestBed } from '@angular/core/testing';

import { TreatementService } from './treatement.service';

describe('TreatementService', () => {
  let service: TreatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

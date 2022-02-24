import { TestBed } from '@angular/core/testing';

import { TypeOfNewsService } from './type-of-news.service';

describe('TypeOfNewsService', () => {
  let service: TypeOfNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOfNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

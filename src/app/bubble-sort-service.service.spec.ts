import { TestBed } from '@angular/core/testing';

import { BubbleSortServiceService } from './bubble-sort-service.service';

describe('BubbleSortServiceService', () => {
  let service: BubbleSortServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BubbleSortServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

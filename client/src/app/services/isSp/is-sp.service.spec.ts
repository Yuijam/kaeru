import { TestBed } from '@angular/core/testing';

import { IsSpService } from './is-sp.service';

describe('IsSpService', () => {
  let service: IsSpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsSpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

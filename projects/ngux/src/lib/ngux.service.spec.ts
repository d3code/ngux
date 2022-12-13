import { TestBed } from '@angular/core/testing';

import { NguxService } from './ngux.service';

describe('NguxService', () => {
  let service: NguxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NguxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

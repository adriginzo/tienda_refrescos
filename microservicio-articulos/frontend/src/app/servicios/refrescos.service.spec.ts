import { TestBed } from '@angular/core/testing';

import { RefrescosService } from './refrescos.service';

describe('RefrescosService', () => {
  let service: RefrescosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefrescosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ListaRefrescosService } from './lista-refrescos.service';

describe('ListaRefrescosService', () => {
  let service: ListaRefrescosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaRefrescosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

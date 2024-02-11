import { TestBed } from '@angular/core/testing';

import { EntregaMaritimaService } from './entrega-maritima.service';

describe('EntregaMaritimaService', () => {
  let service: EntregaMaritimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregaMaritimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

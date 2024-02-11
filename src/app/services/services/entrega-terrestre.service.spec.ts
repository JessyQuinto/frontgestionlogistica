import { TestBed } from '@angular/core/testing';

import { EntregaTerrestreService } from './entrega-terrestre.service';

describe('EntregaTerrestreService', () => {
  let service: EntregaTerrestreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntregaTerrestreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

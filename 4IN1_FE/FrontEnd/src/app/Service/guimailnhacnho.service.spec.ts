import { TestBed } from '@angular/core/testing';

import { GuimailnhacnhoService } from './guimailnhacnho.service';

describe('GuimailnhacnhoService', () => {
  let service: GuimailnhacnhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuimailnhacnhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

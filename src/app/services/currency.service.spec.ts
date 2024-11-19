import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers:[HttpClient]
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { coinService } from './coinapi.service';

describe('UserService', () => {
  let service: coinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(coinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

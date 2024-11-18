import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NativeStorage]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

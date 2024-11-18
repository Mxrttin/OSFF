import { TestBed } from '@angular/core/testing';

import { CarritoService } from './carrito.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('CarritoService', () => {
  let service: CarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[NativeStorage]
    });
    service = TestBed.inject(CarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

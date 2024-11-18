import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleitemPage } from './detalleitem.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Asegúrate de que esta ruta es correcta
import { ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';


describe('DetalleitemPage', () => {
  let component: DetalleitemPage;
  let fixture: ComponentFixture<DetalleitemPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite,NativeStorage,
        {
          provide:ActivatedRoute,
          useValue:{
            snapshot: { paramMap: { get: (key: string) => 'mock-value' } },
            queryParams: of({ someQueryParam: 'mock-query-value' }),
          }
        }
      ]
      
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe incrementar cantidad cuando es menor a 5', () => {
    component.cantidad = 3;

    component.sumarCantidad();

    expect(component.cantidad).toBe(4);
  });

  it('debe restar cantidad ', () => {
    component.cantidad = 3;

    component.restarCantidad();

    expect(component.cantidad).toBe(2);
  });

});
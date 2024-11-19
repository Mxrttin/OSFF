import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleitemPage } from './detalleitem.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';
import { DbService } from 'src/app/services/db.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

describe('DetalleitemPage', () => {
  let component: DetalleitemPage;
  let fixture: ComponentFixture<DetalleitemPage>;
  let carritoServiceSpy: jasmine.SpyObj<CarritoService>;
  let dbServiceSpy: jasmine.SpyObj<DbService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    // Crear spies para los servicios
    carritoServiceSpy = jasmine.createSpyObj('CarritoService', ['agregarProducto', 'obtenerCantidadProducto'], {
      carrito$: of([]) // Observable para el carrito
    });
    dbServiceSpy = jasmine.createSpyObj('DbService', ['dbState', 'fetchTalla']);
    routerSpy = jasmine.createSpyObj('Router', ['getCurrentNavigation']);
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);

    // Configurar comportamiento de los spies
    dbServiceSpy.dbState.and.returnValue(of(true));
    dbServiceSpy.fetchTalla.and.returnValue(of([]));
    routerSpy.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          productoEnviado: {
            id_producto: 1,
            nombre: 'Test Product',
            precio: 100,
            stock: 10
          }
        }
      }
    } as any);
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: () => Promise.resolve()
    } as any));

    await TestBed.configureTestingModule({
      declarations: [DetalleitemPage],
      providers: [
        { provide: SQLite, useValue: {} },
        { provide: HttpClient, useValue: {} },
        { provide: NativeStorage, useValue: {} },
        { provide: CarritoService, useValue: carritoServiceSpy },
        { provide: DbService, useValue: dbServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => 'mock-value' } },
            queryParamMap: of({ someQueryParam: 'mock-query-value' }),
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

  it('debe restar cantidad', () => {
    component.cantidad = 3;
    component.restarCantidad();
    expect(component.cantidad).toBe(2);
  });

  it('no debe incrementar cantidad cuando es 5', () => {
    component.cantidad = 5;
    component.sumarCantidad();
    expect(component.cantidad).toBe(5);
  });

  it('no debe decrementar cantidad cuando es 1', () => {
    component.cantidad = 1;
    component.restarCantidad();
    expect(component.cantidad).toBe(1);
  });

  it('debe mostrar alerta cuando se intenta agregar al carrito sin seleccionar talla', async () => {
    const producto = {
      id_producto: 1,
      nombre: 'Test Product'
    };
    
    await component.agregarAlCarrito(producto);
    expect(alertControllerSpy.create).toHaveBeenCalled();
  });

  it('debe seleccionar talla correctamente', () => {
    component.seleccionarTalla('M');
    expect(component.tallaSeleccionada).toBe('M');
  });
});
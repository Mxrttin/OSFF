import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarproductosPage } from './editarproductos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditarproductosPage', () => {
  let component: EditarproductosPage;
  let fixture: ComponentFixture<EditarproductosPage>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [EditarproductosPage],
      providers: [SQLite,NativeStorage,
        {
          provide:ActivatedRoute,
          useValue:{
            snapshot: { paramMap: { get: (key: string) => 'mock-value' } },
            queryParams: of({ someQueryParam: 'mock-query-value' }),
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarproductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería asignar el precio correctamente si el valor es válido', () => {
    const evento = { target: { value: '123.45' } }; 
    component.validarPrecio(evento);

    expect(component.productoRecibido.precio).toBe(123); 
  });

  it('debería asignar 0 si el valor es una cadena vacía', () => {
    const evento = { target: { value: '' } }; // Valor vacío
    component.validarPrecio(evento);

    expect(component.productoRecibido.precio).toBe(0);
  });

});

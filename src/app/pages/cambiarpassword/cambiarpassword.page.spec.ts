import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarpasswordPage } from './cambiarpassword.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('CambiarpasswordPage', () => {
  let component: CambiarpasswordPage;
  let fixture: ComponentFixture<CambiarpasswordPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [SQLite,
        {
          provide:ActivatedRoute,
          useValue:{
            snapshot: { paramMap: { get: (key: string) => 'mock-value' } },
            queryParams: of({ someQueryParam: 'mock-query-value' }),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validar limpiar campos', () => {
    component.password_actual = 'ejemplopass'
    component.password_nueva = 'ejemplopassN'
    component.confirmar_password = 'ejemplopassN'

    component.limpiarCampos()

    expect(component.password_actual).toBe('');
    expect(component.password_nueva).toBe('');
    expect(component.confirmar_password).toBe('');

  });
});
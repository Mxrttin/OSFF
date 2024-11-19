import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validar contraseña con longitud insuficiente', () => {
    const password = 'P1@';
    const resultado = component.validarPassword(password);
    expect(resultado.valido).toBeFalse();
    expect(resultado.errores).toContain('- Mínimo 8 caracteres');
  });

  it('validar que las contraseñas sean diferentes', () => {
    component.password = 'Prueba123';
    component.confirmarPassword = 'Prueba12';
  
    const resultado = component.passwordDiferentes();
  
    expect(resultado).toBeTrue();
  });

  it('validar que las contraseñas sean iguales', () => {
    component.password = 'Prueba123';
    component.confirmarPassword = 'Prueba123'; 
  
    const resultado = component.passwordDiferentes();
  
    expect(resultado).toBeFalse(); 
});


  

});

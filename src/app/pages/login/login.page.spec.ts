import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AuthService } from 'src/app/services/auth.service';; // Asegúrate de que la ruta sea correcta
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Si es necesario
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NativeStorage,SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validar que se limpian los campos luego de iniciar', () => {
    // Configuración inicial
    component.loginUser = 'usuarioEjemplo';
    component.passwordUser = 'passwordEjemplo';

    component.limpiarCampos();

    expect(component.loginUser).toBe('');
    expect(component.passwordUser).toBe('');
  });

});
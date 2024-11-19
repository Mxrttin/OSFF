import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarcategoriaPage } from './agregarcategoria.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarcategoriaPage', () => {
  let component: AgregarcategoriaPage;
  let fixture: ComponentFixture<AgregarcategoriaPage>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarcategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('mostrar alerta si categoria esta vacia', () => {
  //   component.categoria = ''

  //   spyOn(component, 'mostrarAlerta')

  //   const resultado = component.guardar()

  //   expect(resultado).toBe(false)


  // });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoPage } from './catalogo.page';
import { DbService } from 'src/app/services/db.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Asegúrate de que esta ruta es correcta
import { of } from 'rxjs';

// Mock de SQLite
class SQLiteMock {
  openDatabase() {
    return of(true); // Simula la apertura de la base de datos, puedes ajustarlo según lo que necesites
  }
}

describe('CatalogoPage', () => {
  let component: CatalogoPage;
  let fixture: ComponentFixture<CatalogoPage>;
  let dbService: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoPage],
      providers: [
        DbService,
        { provide: SQLite, useClass: SQLiteMock } // Usamos el mock de SQLite
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogoPage);
    component = fixture.componentInstance;
    dbService = TestBed.inject(DbService); // Inyectamos el servicio DbService
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
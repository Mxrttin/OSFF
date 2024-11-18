import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmincategoriasPage } from './admincategorias.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AdmincategoriasPage', () => {
  let component: AdmincategoriasPage;
  let fixture: ComponentFixture<AdmincategoriasPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [SQLite],
    }).compileComponents();

    fixture = TestBed.createComponent(AdmincategoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

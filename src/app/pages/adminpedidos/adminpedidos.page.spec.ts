import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminpedidosPage } from './adminpedidos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AdminpedidosPage', () => {
  let component: AdminpedidosPage;
  let fixture: ComponentFixture<AdminpedidosPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [SQLite],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminpedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
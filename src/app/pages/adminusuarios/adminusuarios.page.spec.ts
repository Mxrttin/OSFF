import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminusuariosPage } from './adminusuarios.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AdminusuariosPage', () => {
  let component: AdminusuariosPage;
  let fixture: ComponentFixture<AdminusuariosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite],
    }).compileComponents();
    fixture = TestBed.createComponent(AdminusuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

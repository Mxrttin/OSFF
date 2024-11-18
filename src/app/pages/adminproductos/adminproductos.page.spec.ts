import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminproductosPage } from './adminproductos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AdminproductosPage', () => {
  let component: AdminproductosPage;
  let fixture: ComponentFixture<AdminproductosPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminproductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarproductosPage } from './agregarproductos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarproductosPage', () => {
  let component: AgregarproductosPage;
  let fixture: ComponentFixture<AgregarproductosPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents()

    fixture = TestBed.createComponent(AgregarproductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

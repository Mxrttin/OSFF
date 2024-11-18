import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuentaPage } from './cuenta.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


describe('CuentaPage', () => {
  let component: CuentaPage;
  let fixture: ComponentFixture<CuentaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NativeStorage,SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(CuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
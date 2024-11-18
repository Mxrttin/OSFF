import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarperfilPage } from './modificarperfil.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('ModificarperfilPage', () => {
  let component: ModificarperfilPage;
  let fixture: ComponentFixture<ModificarperfilPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SQLite,
        {
          provide:ActivatedRoute,
          useValue:{
            snapshot: { paramMap: { get: (key: string) => 'mock-value' } },
            queryParams: of({ someQueryParam: 'mock-query-value' }),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
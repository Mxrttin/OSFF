import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfousuarioPage } from './infousuario.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Asegúrate de que esta ruta es correcta
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';



describe('InfousuarioPage', () => {
  let component: InfousuarioPage;
  let fixture: ComponentFixture<InfousuarioPage>;

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

    fixture = TestBed.createComponent(InfousuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
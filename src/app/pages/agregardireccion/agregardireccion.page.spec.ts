import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregardireccionPage } from './agregardireccion.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AgregardireccionPage', () => {
  let component: AgregardireccionPage;
  let fixture: ComponentFixture<AgregardireccionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SQLite,
        {
          provide: ActivatedRoute,
          useValue: {
            // Aquí puedes definir cualquier simulación de datos que esperes del ActivatedRoute
            snapshot: { paramMap: { get: (key: string) => 'mock-value' } },
            queryParams: of({ someQueryParam: 'mock-query-value' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregardireccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

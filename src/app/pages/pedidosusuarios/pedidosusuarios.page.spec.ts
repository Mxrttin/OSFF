import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosusuariosPage } from './pedidosusuarios.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PedidosusuariosPage', () => {
  let component: PedidosusuariosPage;
  let fixture: ComponentFixture<PedidosusuariosPage>;

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

    fixture = TestBed.createComponent(PedidosusuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

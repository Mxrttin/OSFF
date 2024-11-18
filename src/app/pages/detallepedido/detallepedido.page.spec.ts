import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, ActivatedRoute, Router, Routes } from '@angular/router';
import { DetallepedidoPage } from './detallepedido.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs';

describe('DetallepedidoPage', () => {
  let component: DetallepedidoPage;
  let fixture: ComponentFixture<DetallepedidoPage>;

  const routes: Routes = [
    { path: '', component: DetallepedidoPage }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallepedidoPage ],
      imports: [
        RouterModule.forRoot(routes)
      ],
      providers: [Router,SQLite,
        {
          provide:ActivatedRoute,
          useValue:{
            snapshot: { paramMap: { get: (key: string) => 'mock-value' } },
            queryParams: of({ someQueryParam: 'mock-query-value' }),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallepedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
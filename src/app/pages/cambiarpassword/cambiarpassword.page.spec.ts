import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarpasswordPage } from './cambiarpassword.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('CambiarpasswordPage', () => {
  let component: CambiarpasswordPage;
  let fixture: ComponentFixture<CambiarpasswordPage>;

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

    fixture = TestBed.createComponent(CambiarpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
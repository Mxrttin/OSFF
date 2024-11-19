import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiKey = 'cur_live_e7lEOgIQfZd0eoDIhuE8hVs4QwOIlKZ4Q3wRzHA9';
  private baseUrl = 'https://api.currencyapi.com/v3/latest?apikey=cur_live_e7lEOgIQfZd0eoDIhuE8hVs4QwOIlKZ4Q3wRzHA9&currencies=EUR%2CUSD%2CCAD';

  constructor(private http: HttpClient) { }

  convertirUSDaCLP(precioUSD: number): Observable<any> {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&base_currency=USD&currencies=CLP`;

    return this.http.get(url).pipe(
      retry(3), 
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      
      console.error('Error:', error.error.message);
    } else {
      
      console.error(
        `Backend retornó código ${error.status}, ` +
        `body was: ${error.error}`);
    }
    
    return of({ data: { CLP: { value: 850 } } }); 
  }
}
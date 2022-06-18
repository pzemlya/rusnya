import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, of, Subject } from 'rxjs';
import { Currency } from '../models/currency';
import { HttpClient } from '@angular/common/http';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private baseUrl = environment.apiUrl;

  private _refetch$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  public getCurrencies$(): Observable<Currency[]> {
    return this._refetch$.pipe(
      startWith(null),
      switchMap(() => this.http.get<Currency[]>(this.baseUrl + '/currencies')),
      catchError((e) => {
        console.warn(e);
        return of([]);
      })
    );
  }

  public createCurrency$(body: Omit<Currency, '_id'>): Observable<boolean> {
    return this.http
      .post<{ isSuccess: boolean }>(this.baseUrl + '/currencies', body)
      .pipe(
        map((result) => Boolean(result?.isSuccess)),
        catchError((e) => {
          console.warn(e);
          return of(false);
        }),
        tap((isSuccess) => isSuccess && this.refetchCurrencies())
      );
  }

  public updateCurrency$(
    id: string,
    body: Omit<Currency, '_id'>
  ): Observable<boolean> {
    return this.http
      .patch<{ isSuccess: boolean }>(this.baseUrl + '/currencies/' + id, body)
      .pipe(
        map((result) => Boolean(result?.isSuccess)),
        catchError((e) => {
          console.warn(e);
          return of(false);
        }),
        tap((isSuccess) => isSuccess && this.refetchCurrencies())
      );
  }

  public deleteCurrency$(id: string): Observable<boolean> {
    return this.http
      .delete<{ isSuccess: boolean }>(this.baseUrl + '/currencies/' + id)
      .pipe(
        map((result) => Boolean(result?.isSuccess)),
        catchError((e) => {
          console.warn(e);
          return of(false);
        }),
        tap((isSuccess) => isSuccess && this.refetchCurrencies())
      );
  }

  public refetchCurrencies(): void {
    this._refetch$.next();
  }

  public getWalletByCurrencyCode$(code: string): Observable<string | null> {
    return this.http
      .get<{ wallet: string | null }>(
        this.baseUrl + '/currencies/wallet/' + code
      )
      .pipe(
        map(({ wallet }) => wallet),
        catchError((e) => {
          console.warn(e);
          return of(null);
        })
      );
  }
}

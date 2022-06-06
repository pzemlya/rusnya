import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateOrder } from '../models/create-order';
import { Observable, of, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { OrderStatus } from '../models/order-status';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl: string = environment.apiUrl;

  private _refetch$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  public getOrders$(): Observable<Order[]> {
    return this._refetch$.asObservable().pipe(
      startWith(null),
      switchMap(() => this.http.get<Order[]>(this.baseUrl + '/orders')),
      catchError((e) => {
        console.warn(e);
        return of([]);
      })
    );
  }

  public updateOrderStatus$(
    id: string,
    status: OrderStatus
  ): Observable<boolean> {
    return this.http
      .patch<{ isSuccess: boolean }>(this.baseUrl + '/orders/' + id, { status })
      .pipe(
        map((result) => Boolean(result?.isSuccess)),
        catchError((e) => {
          console.warn(e);
          return of(false);
        }),
        tap((isSuccess) => !isSuccess && this.refetchOrders())
      );
  }

  public createOrder$(
    body: CreateOrder
  ): Observable<{ isSuccess: true; orderId: string }> {
    return this.http.post<{ isSuccess: true; orderId: string }>(
      this.baseUrl + '/orders',
      body
    );
  }

  public getOrderById$(id: string): Observable<Order> {
    return this.http.get<Order>(this.baseUrl + '/orders/' + id);
  }

  public refetchOrders() {
    this._refetch$.next();
  }
}

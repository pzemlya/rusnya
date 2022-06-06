import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrdersService } from './orders.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderResolver implements Resolve<Order> {
  constructor(private ordersService: OrdersService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Order> {
    const id = route.paramMap.get('id');

    if (id) {
      return this.ordersService.getOrderById$(id).pipe(
        catchError((e) => {
          console.error(e);
          this.router.navigate(['/']);
          return EMPTY;
        })
      );
    } else {
      this.router.navigate(['/']);
      return EMPTY;
    }
  }
}

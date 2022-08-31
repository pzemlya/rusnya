import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../../services/header-data.service';
import { Order } from '../../../models/order';
import { OrderStatus } from '../../../models/order-status';
import { OrdersService } from '../../../services/orders.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public page: number = 1;
  public orders: Order[] = [
    {
      _id: '1',
      from: {
        code: 'BTC',
        name: 'Bitcoin',
        amount: 0.25,
      },
      to: {
        code: 'ETH',
        name: 'Ethereum',
        amount: 4.58,
      },
      email: 'xyu@gmail.com',
      userName: 'Хатына Ульяна Йосыповна',
      requisites: '4441114421151890',
      dateStart: new Date(),
      dateEnd: new Date(),
      status: OrderStatus.onCheck,
    },
  ];

  private onDestroy$ = new Subject<void>();

  public isLoading: boolean = false;

  constructor(
    private headerDataService: HeaderDataService,
    private ordersService: OrdersService
  ) {}

  public onStatusChange(id: string, status: OrderStatus) {
    this.isLoading = true;
    this.ordersService.updateOrderStatus$(id, status).subscribe(() => {
      this.isLoading = false;
    });
    const foundOrder = this.orders.find((order) => order._id === id);
    if (foundOrder) {
      foundOrder.status = status;
    }
  }

  public onPageChange(page: number): void {
    this.page = page;
  }

  ngOnInit(): void {
    this.headerDataService.setTitleKey('Заказы');
    this.headerDataService.setBottomPadding(94);

    this.isLoading = true;
    this.ordersService
      .getOrders$()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((orders) => {
        this.orders = orders;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();

    this.headerDataService.removeTitleKey();
  }
}

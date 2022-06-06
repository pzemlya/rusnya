import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderStatus } from '../../../models/order-status';
import { statusMap } from '../../constants/constants';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent {
  @Input() order: Order | undefined;
  @Output() statusChanged = new EventEmitter<OrderStatus>();
  public readonly OrderStatus = OrderStatus;
  public readonly statusMap = statusMap;
  public readonly statuses = Object.values<OrderStatus>(OrderStatus);
  public isOpened: boolean = false;

  public changeStatus(status: OrderStatus): void {
    this.setOpened(false);
    this.statusChanged.emit(status);
  }

  public setOpened(isOpened: boolean): void {
    this.isOpened = isOpened;
  }
}

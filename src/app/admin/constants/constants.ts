import { OrderStatus } from '../../models/order-status';

export const statusMap: Record<OrderStatus, string> = {
  [OrderStatus.onCheck]: 'order.onCheck',
  [OrderStatus.error]: 'order.error',
  [OrderStatus.completed]: 'order.completed',
};

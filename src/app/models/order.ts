import { OrderStatus } from './order-status';
export type Order = {
  _id: string;
  from: {
    code: string;
    name: string;
    amount: number;
  };
  to: {
    code: string;
    name: string;
    amount: number;
  };
  email: string;
  requisites: string;
  status: OrderStatus;
  dateStart: Date;
  dateEnd: Date;
};

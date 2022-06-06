import { Currency } from './currency';

export type AvailableCurrency = Pick<Currency, 'code' | 'name' | 'iconName'> & {
  rate: number;
  reserve?: number;
};

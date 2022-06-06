import { AvailableCurrency } from './available-currency';

export type Currency = {
  _id: string | null;
  code: string;
  name: string;
  iconName: string;
  min?: number;
  max?: number;
  availableCurrencies?: AvailableCurrency[];
  message?: string;
};

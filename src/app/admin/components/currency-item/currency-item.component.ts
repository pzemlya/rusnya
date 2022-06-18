import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Currency } from '../../../models/currency';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AvailableCurrencyKeys } from '../../models/available-currency-keys';
import { CurrencyKeys } from '../../models/currency-keys';

@Component({
  selector: 'app-currency-item',
  templateUrl: './currency-item.component.html',
  styleUrls: ['./currency-item.component.scss'],
})
export class CurrencyItemComponent implements OnChanges {
  private readonly baseIconUrl = 'https://nftoption24.com/img/pm2/';
  private readonly baseIconExtension = '.svg';

  @Input() currency: Currency | undefined;
  @Output() currencySaved = new EventEmitter<Currency>();
  @Output() currencyDeleted = new EventEmitter<string>();

  public readonly CurrencyKeys = CurrencyKeys;
  public readonly AvailableCurrencyKeys = AvailableCurrencyKeys;

  public isOpened: boolean = false;

  public form = new FormGroup({
    [CurrencyKeys._id]: new FormControl(null),
    [CurrencyKeys.iconName]: new FormControl(null),
    [CurrencyKeys.code]: new FormControl(null),
    [CurrencyKeys.name]: new FormControl(null),
    [CurrencyKeys.min]: new FormControl(null),
    [CurrencyKeys.max]: new FormControl(null),
    [CurrencyKeys.wallet]: new FormControl(null),
    [CurrencyKeys.message]: new FormControl(null),
    [CurrencyKeys.availableCurrencies]: new FormArray([]),
  });

  public get availableCurrencies() {
    return this.form.get(CurrencyKeys.availableCurrencies) as FormArray;
  }

  public get iconName() {
    return this.form.get(CurrencyKeys.iconName) as FormControl;
  }

  public get code() {
    return this.form.get(CurrencyKeys.code) as FormControl;
  }

  public get name() {
    return this.form.get(CurrencyKeys.name) as FormControl;
  }

  public getCurrencyIconLink(iconName: string) {
    return this.baseIconUrl + iconName + this.baseIconExtension;
  }

  ngOnChanges() {
    const {
      _id,
      iconName,
      code,
      name,
      min,
      max,
      wallet,
      message,
      availableCurrencies,
    } = this.currency ?? {};
    this.form.patchValue({
      [CurrencyKeys._id]: _id ?? null,
      [CurrencyKeys.iconName]: iconName ?? null,
      [CurrencyKeys.code]: code ?? null,
      [CurrencyKeys.name]: name ?? null,
      [CurrencyKeys.min]: min ?? null,
      [CurrencyKeys.max]: max ?? null,
      [CurrencyKeys.wallet]: wallet ?? null,
      [CurrencyKeys.message]: message ?? null,
    });

    availableCurrencies?.forEach((availableCurrency) => {
      this.availableCurrencies.push(
        new FormGroup({
          [AvailableCurrencyKeys.iconName]: new FormControl(
            availableCurrency.iconName ?? null
          ),
          [AvailableCurrencyKeys.code]: new FormControl(
            availableCurrency.code ?? null
          ),
          [AvailableCurrencyKeys.name]: new FormControl(
            availableCurrency.name ?? null
          ),
          [AvailableCurrencyKeys.rate]: new FormControl(
            availableCurrency.rate ?? null
          ),
          [AvailableCurrencyKeys.reserve]: new FormControl(
            availableCurrency.reserve ?? null
          ),
        })
      );
    });
  }

  public addAvailableCurrency(): void {
    this.availableCurrencies.push(
      new FormGroup({
        [AvailableCurrencyKeys.iconName]: new FormControl(),
        [AvailableCurrencyKeys.code]: new FormControl(),
        [AvailableCurrencyKeys.name]: new FormControl(),
        [AvailableCurrencyKeys.rate]: new FormControl(),
        [AvailableCurrencyKeys.reserve]: new FormControl(),
      })
    );
  }

  public onSubmit() {
    const currency = this.form.value as Currency;

    this.isOpened = false;

    this.currencySaved.next(currency);
  }

  public deleteAvailableCurrency(index: number) {
    this.availableCurrencies.removeAt(index);
  }

  public deleteCurrency(): void {
    const id = this.currency?._id;
    if (id) {
      this.currencyDeleted.next(id);
    }
  }
}

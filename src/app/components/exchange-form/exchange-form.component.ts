import { Component, OnDestroy, OnInit } from '@angular/core';
import { Currency } from '../../models/currency';
import { AvailableCurrency } from '../../models/available-currency';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  catchError,
  debounceTime,
  filter,
  map,
  take,
  takeUntil,
} from 'rxjs/operators';
import { CurrenciesService } from '../../services/currencies.service';
import { of, Subject } from 'rxjs';
import { CreateOrder } from '../../models/create-order';
import { Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss'],
})
export class ExchangeFormComponent implements OnInit, OnDestroy {
  public currencies: Currency[] = [];
  public selectedGiveCurrency: Currency | null = null;
  public selectedGetCurrency: AvailableCurrency | null = null;
  public giveOpened: boolean = false;
  public getOpened: boolean = false;
  public form = new FormGroup({
    giveCurrency: new FormControl(null, Validators.required),
    getCurrency: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    cardNumber: new FormControl(null, Validators.required),
  });
  private readonly baseIconUrl =
    window.location.origin + '/assets/img/svg-icons/';
  private readonly baseIconExtension = '.svg';
  private onDestroy$ = new Subject<void>();
  constructor(
    private currenciesService: CurrenciesService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  public get getCurrencyControl(): FormControl {
    return this.form.get('getCurrency') as FormControl;
  }
  public get giveCurrencyControl(): FormControl {
    return this.form.get('giveCurrency') as FormControl;
  }
  public get invalid() {
    return (
      this.form.invalid ||
      !this.selectedGetCurrency ||
      !this.selectedGiveCurrency
    );
  }
  public getCurrencyIconLink(iconName: string) {
    return this.baseIconUrl + iconName + this.baseIconExtension;
  }

  ngOnInit(): void {
    this.giveCurrencyControl.valueChanges
      .pipe(
        debounceTime(50),
        map((value) => +value),
        filter((value): value is number => typeof value === 'number' && !!value)
      )
      .subscribe((value) => {
        const maxGiveValue = this.selectedGiveCurrency?.max ?? Number.MAX_VALUE;
        const minGiveValue = this.selectedGiveCurrency?.min ?? 0;
        if (value > maxGiveValue) {
          this.giveCurrencyControl.setValue(maxGiveValue);
          return;
        }
        if (value < minGiveValue) {
          this.giveCurrencyControl.setValue(minGiveValue);
          return;
        }
        const getCurrencyRate = this.selectedGetCurrency?.rate;
        if (getCurrencyRate) {
          const getCurrencyValue = getCurrencyRate * value;
          const getCurrencyReserve =
            this.selectedGetCurrency?.reserve ?? Number.MAX_VALUE;
          if (getCurrencyReserve < getCurrencyValue) {
            this.giveCurrencyControl.setValue(
              getCurrencyReserve / getCurrencyRate
            );
            return;
          }
          this.getCurrencyControl.setValue(getCurrencyValue, {
            emitEvent: false,
          });
        }
      });
    this.setCurrencies();
    this.getCurrencyControl.valueChanges
      .pipe(
        debounceTime(50),
        map((value) => +value),
        filter((value): value is number => typeof value === 'number' && !!value)
      )
      .subscribe((value) => {
        const maxGiveValue = this.selectedGiveCurrency?.max ?? Number.MAX_VALUE;
        const reserve = this.selectedGetCurrency?.reserve;
        const rate = this.selectedGetCurrency?.rate;
        if (reserve && rate) {
          const newMaxGiveValue = Math.min(
            maxGiveValue,
            reserve / rate,
            Number.MAX_VALUE
          );
          const newGiveValue = value / rate;
          this.giveCurrencyControl.setValue(
            Math.min(newGiveValue, newMaxGiveValue),
            { emitEvent: true }
          );
        }
      });
  }
  public selectGiveCurrency(currency: Currency): void {
    this.selectedGiveCurrency = currency;
    this.selectedGetCurrency = currency.availableCurrencies?.[0] ?? null;
    this.giveOpened = false;
    this.giveCurrencyControl.setValue(0);
  }
  public selectGetCurrency(currency: AvailableCurrency): void {
    this.selectedGetCurrency = currency;
    this.getOpened = false;
    this.getCurrencyControl.setValue(0);
  }
  public setGiveOpened(opened: boolean) {
    this.giveOpened = opened;
  }
  public setGetOpened(opened: boolean) {
    this.getOpened = opened;
  }
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  public onSubmit() {
    if (this.invalid) {
      return;
    }
    const value = this.form.value as {
      giveCurrency: number;
      getCurrency: number;
      email: string;
      cardNumber: number;
    };

    const body: CreateOrder = {
      from: {
        code: this.selectedGiveCurrency?.code ?? '',
        name: this.selectedGiveCurrency?.name ?? '',
        amount: value.giveCurrency,
      },
      to: {
        code: this.selectedGetCurrency?.code ?? '',
        name: this.selectedGetCurrency?.name ?? '',
        amount: value.getCurrency,
      },
      email: value.email,
      requisites: value.cardNumber.toString(),
    };

    this.ordersService
      .createOrder$(body)
      .pipe(
        take(1),
        takeUntil(this.onDestroy$),
        catchError((e) => {
          console.error(e);
          return of(e.error);
        })
      )
      .subscribe(({ orderId }) => {
        if (orderId) {
          this.router.navigate(['/orders', orderId]);
        }
      });
  }
  private setCurrencies() {
    this.currenciesService
      .getCurrencies$()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((currencies) => {
        this.currencies = currencies;
        this.selectedGiveCurrency = this.currencies[0];
        this.selectedGetCurrency =
          this.selectedGiveCurrency?.availableCurrencies?.[0] ?? null;
      });
  }
}

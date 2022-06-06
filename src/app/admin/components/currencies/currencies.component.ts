import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderDataService } from '../../../services/header-data.service';
import { Currency } from '../../../models/currency';
import { CurrenciesService } from '../../../services/currencies.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit, OnDestroy {
  public currencies: Currency[] = [];

  public isLoading: boolean = false;
  private onDestroy$ = new Subject<void>();

  constructor(
    private headerDataService: HeaderDataService,
    private currenciesService: CurrenciesService
  ) {}

  ngOnInit(): void {
    this.headerDataService.setTitleKey('Валюты');
    this.headerDataService.setBottomPadding(94);

    this.isLoading = true;
    this.currenciesService
      .getCurrencies$()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((currencies) => {
        this.currencies = currencies;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();

    this.headerDataService.removeTitleKey();
  }

  public addCurrency() {
    this.currencies.push({ _id: null, code: '', name: '', iconName: '' });
  }

  public onSaveCurrency(currency: Currency) {
    this.isLoading = true;
    const { _id, ...body } = currency;

    if (!_id) {
      this.currenciesService
        .createCurrency$(body)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.isLoading = false;
        });
    } else {
      this.currenciesService
        .updateCurrency$(_id, body)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(() => {
          this.isLoading = false;
        });
    }
  }

  public onDeleteCurrency(id: string) {
    this.isLoading = true;

    this.currenciesService
      .deleteCurrency$(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.isLoading = false;
      });
  }
}

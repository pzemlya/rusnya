import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order';
import { statusMap } from '../../admin/constants/constants';
import { OrderStatus } from '../../models/order-status';
import { take, takeUntil, tap } from 'rxjs/operators';
import { CurrenciesService } from '../../services/currencies.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  public readonly statusMap = statusMap;
  public readonly OrderStatus = OrderStatus;

  public order: Order | null = null;
  public wallet: string | null = null;
  public isLoadingWallet = false;
  public time: { minutes: number; seconds: number } | null = null;
  public interval: number | null = null;

  private onDestroy$ = new Subject<void>();

  constructor(
    private headerDataService: HeaderDataService,
    private route: ActivatedRoute,
    private currenciesService: CurrenciesService
  ) {}

  ngOnInit(): void {
    this.headerDataService.setTitleKey('pages.order.title');

    this.route.data
      .pipe(
        tap((data) => {
          this.isLoadingWallet = true;
          const code = data.order?.from?.code || null;
          if (code) {
            this.currenciesService
              .getWalletByCurrencyCode$(code)
              .pipe(take(1), takeUntil(this.onDestroy$))
              .subscribe((wallet) => {
                this.isLoadingWallet = false;
                if (wallet) {
                  this.wallet = wallet;
                }
              });
          }
        })
      )
      .subscribe((data) => {
        this.order = data.order;
        this.interval = setInterval(() => {
          if (this.order) {
            const dateEnd = new Date(this.order.dateEnd);
            const dateNow = new Date();
            const dateDiff = dateEnd.getTime() - dateNow.getTime();
            if (dateDiff > 0) {
              const date = new Date(dateDiff);
              this.time = {
                minutes: date.getMinutes(),
                seconds: date.getSeconds(),
              };
            } else {
              this.time = null;
              if (this.interval) {
                clearInterval(this.interval);
              }
            }
          }
        }, 1000);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();

    this.headerDataService.removeTitleKey();
  }

  public refresh() {
    location.reload();
  }
}

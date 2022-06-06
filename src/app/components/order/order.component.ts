import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order';
import { statusMap } from '../../admin/constants/constants';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  public readonly statusMap = statusMap;

  public order: Order | null = null;
  public time: { minutes: number; seconds: number } | null = null;
  private interval: number | null = null;

  constructor(
    private headerDataService: HeaderDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.headerDataService.setTitleKey('pages.order.title');

    this.route.data.subscribe((data) => {
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
    this.headerDataService.removeTitleKey();
  }
}

import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../../services/header-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private headerDataService: HeaderDataService) {}

  ngOnInit(): void {
    this.headerDataService.setTitleKey('pages.user.orders.title');
    this.headerDataService.setBottomPadding(94);
  }

  ngOnDestroy(): void {
    this.headerDataService.removeTitleKey();
  }
}

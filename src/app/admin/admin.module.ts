import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-accordion';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdminRoutingModule } from './admin-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { CurrencyItemComponent } from './components/currency-item/currency-item.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OrdersComponent,
    CurrenciesComponent,
    MainComponent,
    OrderItemComponent,
    CurrencyItemComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AccordionModule,
    SharedModule,
    TranslateModule,
  ],
})
export class AdminModule {}

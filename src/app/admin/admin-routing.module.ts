import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './components/orders/orders.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'orders' },
      { path: 'orders', component: OrdersComponent },
      { path: 'currencies', component: CurrenciesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

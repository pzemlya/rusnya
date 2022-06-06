import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AdminGuard } from './admin.guard';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AdminGuard],
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

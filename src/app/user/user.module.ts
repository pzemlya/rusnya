import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MainComponent } from './components/main/main.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProfileComponent,
    OrdersComponent,
    MessagesComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    SharedModule,
    UserRoutingModule,
  ],
})
export class UserModule {}

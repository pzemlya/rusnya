import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NewsComponent } from './components/news/news.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserAgreementComponent } from './components/user-agreement/user-agreement.component';
import { HowStartComponent } from './components/how-start/how-start.component';
import { AmlPolicyComponent } from './components/aml-policy/aml-policy.component';
import { OrderComponent } from './components/order/order.component';
import { UserGuard } from './services/user.guard';
import { OrderResolver } from './services/order.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent },
  { path: 'news', component: NewsComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'contacts', component: ContactComponent },
  { path: 'privacy_policy', component: AmlPolicyComponent },
  { path: 'tеrms_of_service', component: UserAgreementComponent },
  { path: 'how_start', component: HowStartComponent },
  {
    path: 'orders/:id',
    component: OrderComponent,
    resolve: { order: OrderResolver },
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [UserGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

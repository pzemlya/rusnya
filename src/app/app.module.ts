import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ruLocale from '@angular/common/locales/ru';
import enLocale from '@angular/common/locales/en';
import { BrowserModule } from '@angular/platform-browser';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxMaskModule } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { ForumsComponent } from './components/forums/forums.component';
import { FooterComponent } from './components/footer/footer.component';
import { ExchangeFormComponent } from './components/exchange-form/exchange-form.component';
import { NewsComponent } from './components/news/news.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserAgreementComponent } from './components/user-agreement/user-agreement.component';
import { AmlPolicyComponent } from './components/aml-policy/aml-policy.component';
import { MainComponent } from './components/main/main.component';
import { HowStartComponent } from './components/how-start/how-start.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { OrderComponent } from './components/order/order.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

registerLocaleData(ruLocale, 'ru');
registerLocaleData(enLocale, 'en');

const HttpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>
  new TranslateHttpLoader(http);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ForumsComponent,
    FooterComponent,
    ExchangeFormComponent,
    NewsComponent,
    ReviewsComponent,
    ContactComponent,
    UserAgreementComponent,
    AmlPolicyComponent,
    MainComponent,
    HowStartComponent,
    LatestNewsComponent,
    OrderComponent,
    LoginModalComponent,
    RegisterModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxMaskModule.forRoot(),
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

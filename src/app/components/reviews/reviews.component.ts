import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { Review } from '../../models/reviews';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  public get lang() {
    return this.translate.currentLang;
  }

  public reviews: Review[] = [
    {
      text: 'Все супер',
      who: 'Наталья Попелыш',
      date: new Date(2022, 3, 29, 9, 17, 30),
    },
    {
      text: 'Все отлично, красавчики!',
      who: 'Вадим Сергеевич',
      date: new Date(2022, 3, 28, 13, 33, 59),
    },
    {
      text: 'Очень быстро и удобно, рекомендую!',
      who: 'Михаил',
      date: new Date(2022, 3, 27, 17, 9, 12),
    },
    {
      text: 'все круто',
      who: 'Игорь',
      date: new Date(2022, 3, 26, 20, 59, 59),
    },
    {
      text: 'Всё отлично! Спасибо!',
      who: 'Michael Sadovnikov',
      date: new Date(2022, 3, 25, 11, 50, 44),
    },
    {
      text: 'Ура! Всё получилось ))',
      who: 'Игорь',
      date: new Date(2022, 3, 23, 22, 34, 17),
    },
    {
      text: 'Быстро и четко, респект таким парням',
      who: 'Степка',
      date: new Date(2022, 3, 22, 15, 49, 15),
    },
    {
      text: 'Все отлично,15 минут и готово.',
      who: 'Ильшат',
      date: new Date(2022, 3, 16, 21, 39, 46),
    },
    {
      text: 'Быстро, четко, сочно, мощно',
      who: 'Джек воробей',
      date: new Date(2022, 3, 16, 13, 37, 12),
    },
    {
      text: 'Всё быстро дошло. буквально 2 минуты.',
      who: 'Данила',
      date: new Date(2022, 3, 15, 23, 40, 11),
    },
  ];

  constructor(
    private headerDataService: HeaderDataService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.headerDataService.setTitleKey('pages.reviews');
  }

  ngOnDestroy(): void {
    this.headerDataService.removeTitleKey();
  }
}

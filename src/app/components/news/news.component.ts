import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { News } from '../../models/news';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public readonly news: News[] = [
    {
      title: 'Новый 2021 год!',
      text: 'Поддержка будет работать в круглосуточном режиме все праздничные дни. Получение и обработка переводов Золотая корона, Western Union,, Contact, Unistream и RIA будет возобновлена с 7.01 2021 г',
      link: 'https://openchange.cash/ru/news/noviy_2021_god.html',
      date: new Date(2020, 11, 27, 0, 0, 0),
    },
    {
      title: 'График 1-5 мая',
      text: 'Информируем Вас о том, что в период 1 - 5 Мая заказы с системами Western Union, Money Gram, RIA, Contact, Goldencrown, Unistream будут обработаны 6-7 мая',
      link: 'https://openchange.cash/ru/news/maya.html',
      date: new Date(2020, 3, 29, 0, 0, 0),
    },
    {
      title:
        'Возможные задержки с получением и отправкой средств через системы срочных переводов',
      text: 'Пожалуйста, обратите внимание на возможные задержки с получением и отправкой переводов MoneyGram, Western Union, Contact, Золотая корона, RIA и Unistream. Из-за карантина на территории России может быть ограничена работа банков и передвижение наших агентов. Просим учитывать это при создании заявок с использованием систем срочных переводов.',
      link: 'https://openchange.cash/ru/news/989898.html',
      date: new Date(2020, 2, 30, 0, 0, 0),
    },
    {
      title: 'Новый 2020 год!',
      text: 'Поддержка будет работать в круглосуточном режиме все праздничные дни. Получение и обработка переводов Золотая корона, Western Union, Moneygram, Contact, Unistream и RIA будет возобновлена с 6.01 2019 г.',
      link: 'https://openchange.cash/ru/news/noviy_2020_god.html',
      date: new Date(2019, 11, 27, 0, 0, 0),
    },
    {
      title: 'Добавлены новые банки',
      text: 'На сайте включены в работу банки: Русский стандарт, Газпромбанк и банковская карта Кукуруза.',
      link: 'https://openchange.cash/ru/news/dobavleny_novye_banki.html',
      date: new Date(2019, 3, 24, 1, 11, 0),
    },
    {
      title: 'Новый год 2018 !',
      text:
        'Сроки обработки заявок по обмену, покупке и продаже электронных валют и криптовалют через банки остаются без изменений.\n' +
        'Получение и обработка денежных переводов Western Union и т.п. будет возобновлена с 6.01 2018 г.',
      link: 'https://openchange.cash/ru/news/novyy_god_2018_.html',
      date: new Date(2017, 11, 28, 7, 58, 0),
    },
    {
      title: 'Режим работы в ноябре',
      text: 'Обращаем внимание на график работы в ноябре офисов Moneygram и Western Union - они будут закрыты для посещения 4,5,6 ноября. Мы не сможем отправлять и получать переводы в этот день. Приносим извинения за доставленные неудобства.',
      link: 'https://openchange.cash/ru/news/rezhim_raboty_v_noyab1re.html',
      date: new Date(2017, 10, 2, 12, 10, 0),
    },
    {
      title: 'Bitcoin снова доступен к обмену',
      text: 'Информируем о включении направлении обмена с криптовалютой Bitcoin, покупка/продажа/обмен работают в штатном режиме.',
      link: 'https://openchange.cash/ru/news/bitcoin_snova_dostupen_k_obmenu.html',
      date: new Date(2017, 7, 7, 22, 29, 0),
    },
    {
      title: 'Обновление протокола Bitcoin - временно BTC обмены не доступны',
      text: 'Информируем о временном отключении Bitcoin, в связи с началом обновлений протокола сети криптовалюты. Операции станут доступными после восстановления работоспособности сети Биткоин к обычному режиму работы.',
      link: 'https://openchange.cash/ru/news/obnovlenie_protokola_bitcoin_vremenno_btc_obmeny_ne_dostupny.html',
      date: new Date(2017, 6, 31, 15, 16, 0),
    },
    {
      title: 'Обновление Openchange.me',
      text: 'Мы рады представить вам новую версию сайта Openchange.me. Обновление сайта включило в себя перенос на новое техническое ядро с обновленным, богатым функционалом, расширенные возможности поиска, удобный чат по заявкам и легкое создание заявок - это лишь часть новых преимуществ.',
      link: 'https://openchange.cash/ru/news/obnovlenie_openchange_me.html',
      date: new Date(2017, 6, 18, 10, 1, 0),
    },
  ];

  constructor(
    private headerDataService: HeaderDataService,
    private translate: TranslateService
  ) {}

  public get lang() {
    return this.translate.currentLang;
  }

  ngOnInit(): void {
    this.headerDataService.setTitleKey('pages.news');
  }

  ngOnDestroy(): void {
    this.headerDataService.removeTitleKey();
  }
}

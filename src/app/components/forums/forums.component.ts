import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss'],
})
export class ForumsComponent implements OnInit {
  forums = [
    {
      url: 'https://www.bestchange.ru/openchange-exchanger.html',
      imageUrl: '../../../assets/img/forums/best-change.png',
    },
    {
      url: 'http://moneymakergroup.com/',
      imageUrl: '../../../assets/img/forums/mmg.png',
    },
    {
      url: 'http://talkgold.com/',
      imageUrl: '../../../assets/img/forums/talkgold.png',
    },
    {
      url: 'http://moneytalkvillage.com/',
      imageUrl: '../../../assets/img/forums/mtv.png',
    },
    {
      url: 'https://bitcointalk.org/',
      imageUrl: '../../../assets/img/forums/bitcointalk.png',
    },
    {
      url: 'https://bitcoinforum.com/',
      imageUrl: '../../../assets/img/forums/bitcoinforum.png',
    },
    { url: 'http://mmgp.ru/', imageUrl: '../../../assets/img/forums/mmgp.png' },
    {
      url: 'http://rusmmg.ru/',
      imageUrl: '../../../assets/img/forums/rusmmg.png',
    },
    {
      url: 'https://forum.bits.media/',
      imageUrl: '../../../assets/img/forums/bits-media.png',
    },
    {
      url: 'http://dreamteammoney.com/',
      imageUrl: '../../../assets/img/forums/ptm.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

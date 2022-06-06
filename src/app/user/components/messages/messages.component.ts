import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../../services/header-data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(private headerDataService: HeaderDataService) {}

  ngOnInit(): void {
    this.headerDataService.setTitleKey('pages.user.messages.title');
    this.headerDataService.setBottomPadding(94);
  }

  ngOnDestroy(): void {
    this.headerDataService.removeTitleKey();
  }
}

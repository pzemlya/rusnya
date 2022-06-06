import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  constructor(private headerDataService: HeaderDataService) {}

  ngOnInit(): void {
    this.headerDataService.setTitleKey('pages.contacts');
  }

  ngOnDestroy(): void {
    this.headerDataService.removeTitleKey();
  }
}

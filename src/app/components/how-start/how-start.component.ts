import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';

@Component({
  selector: 'app-how-start',
  templateUrl: './how-start.component.html',
  styleUrls: ['./how-start.component.scss'],
})
export class HowStartComponent implements OnInit {
  constructor(private headerDataService: HeaderDataService) {}

  ngOnInit(): void {
    this.headerDataService.setTitleKey('pages.howToStart.title');
  }

  ngOnDestroy(): void {
    this.headerDataService.removeTitleKey();
  }
}

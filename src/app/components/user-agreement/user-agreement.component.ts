import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';

@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.scss'],
})
export class UserAgreementComponent implements OnInit {
  constructor(private headerDataService: HeaderDataService) {}

  ngOnInit(): void {
    this.headerDataService.setTitleKey('pages.userAgreement.title');
  }

  ngOnDestroy(): void {
    this.headerDataService.removeTitleKey();
  }
}

import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-aml-policy',
  templateUrl: './aml-policy.component.html',
  styleUrls: ['./aml-policy.component.scss'],
})
export class AmlPolicyComponent implements OnInit {
  constructor(private headerDataService: HeaderDataService) {}

  ngOnInit(): void {
    this.headerDataService.setTitleKey('pages.aml.title');
  }

  ngOnDestroy(): void {
    this.headerDataService.removeTitleKey();
  }
}

import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../../services/header-data.service';
import { AuthService } from '../../../services/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private headerDataService: HeaderDataService,
    private authService: AuthService
  ) {}

  public get email() {
    return this.authService.userData?.email;
  }

  public emailControl = new FormControl(this.email);

  ngOnInit(): void {
    this.headerDataService.setTitleKey('pages.user.profile.title');
    this.headerDataService.setBottomPadding(94);
  }

  ngOnDestroy(): void {
    this.headerDataService.removeTitleKey();
  }
}

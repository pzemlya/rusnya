import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageCodesEnum } from '../../models/languages.enum';
import { take } from 'rxjs/operators';
import { HeaderDataService } from '../../services/header-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./logo.scss', './header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public dropDownOpened: boolean = false;
  public languagesMap: Record<LanguageCodesEnum, string> = {
    [LanguageCodesEnum.EN]: 'English',
    [LanguageCodesEnum.RU]: 'Русский',
  };
  public languagesMapEntries = Object.entries(this.languagesMap);
  public selectedLanguage: LanguageCodesEnum =
    this.translate.getDefaultLang() as LanguageCodesEnum;
  public paddingBottom$ = this.headerDataService.bottomPadding$;
  public titleKey$ = this.headerDataService.titleKey$;

  public isOpenedLoginModal = false;
  public isOpenedRegisterModal = false;

  constructor(
    private translate: TranslateService,
    private headerDataService: HeaderDataService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const browserLang = this.translate.getBrowserLang();
    const lang =
      JSON.parse(localStorage.getItem('open-change-language') ?? '') ||
      this.translate.getDefaultLang();
    this.selectedLanguage = Object.keys(LanguageCodesEnum).includes(browserLang)
      ? browserLang
      : lang;
    this.translate
      .use(this.selectedLanguage)
      .subscribe(() =>
        localStorage.setItem(
          'open-change-language',
          JSON.stringify(this.selectedLanguage)
        )
      );
  }

  public setLanguage(code: string) {
    this.selectedLanguage = code as LanguageCodesEnum;
    this.translate
      .use(code)
      .pipe(take(1))
      .subscribe(() => {
        localStorage.setItem('open-change-language', JSON.stringify(code));
        this.setOpened(false);
      });
  }

  public setOpened(opened: boolean): void {
    this.dropDownOpened = opened;
  }

  public openLoginModal() {
    this.isOpenedLoginModal = true;
  }

  public openRegisterModal() {
    this.isOpenedRegisterModal = true;
  }

  public logout() {
    this.authService.logout();
  }
}

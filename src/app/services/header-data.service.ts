import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const INIT_BOTTOM_PADDING = 250;

@Injectable({
  providedIn: 'root',
})
export class HeaderDataService {
  private bottomPadding = new BehaviorSubject<number>(INIT_BOTTOM_PADDING);
  public bottomPadding$ = this.bottomPadding.asObservable();

  private titleKey = new BehaviorSubject<string>('');
  public titleKey$ = this.titleKey.asObservable();

  constructor() {}

  public setBottomPadding(px: number): void {
    this.bottomPadding.next(px);
  }

  public resetBottomPadding(): void {
    this.bottomPadding.next(INIT_BOTTOM_PADDING);
  }

  public setTitleKey(titleKey: string): void {
    this.titleKey.next(titleKey);
    this.setBottomPadding(40);
  }

  public removeTitleKey(): void {
    this.titleKey.next('');
    this.resetBottomPadding();
  }
}

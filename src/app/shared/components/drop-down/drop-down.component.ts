import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit, AfterViewInit {
  @Input() buttonContent: TemplateRef<unknown> | undefined;
  @Input() dropDownContent: TemplateRef<unknown> | undefined;
  @Input() showArrow: boolean = true;
  @Input() opened: boolean = false;
  @Input() bgProp: string = '';
  @Input() bordered: boolean = true;

  @Output() openToggled = new EventEmitter<boolean>();

  private onDestroy$ = new Subject<void>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dropDownRef: ElementRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    fromEvent(this.document, 'click')
      .pipe(
        takeUntil(this.onDestroy$),
        filter((event): event is PointerEvent => event instanceof PointerEvent)
      )
      .subscribe((event: PointerEvent) => {
        const target = event.target as HTMLElement;
        const dropDownElement = this.dropDownRef.nativeElement as HTMLElement;
        if (!dropDownElement.contains(target)) {
          this.opened = false;
          this.openToggled.emit(this.opened);
        }
      });
  }

  public toggleOpened(): void {
    this.opened = !this.opened;
    this.openToggled.emit(this.opened);
  }

  public preventClose(event: Event) {
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

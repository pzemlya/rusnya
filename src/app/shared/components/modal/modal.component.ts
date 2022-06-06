import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() isOpened: boolean = false;

  @Output() closed = new EventEmitter<boolean>();

  constructor() {}

  public stopPropagating(event: Event): void {
    event.stopPropagation();
  }

  public close(): void {
    this.isOpened = false;
    this.closed.emit(this.isOpened);
  }
}

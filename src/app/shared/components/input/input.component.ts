import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

const generateRandomId = (label?: string) => {
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${label ? label : ''}-${randomLetter}${
    (Math.random() * Date.now()) % 10000
  }`;
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  host: { '(blur)': 'onBlur()' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent<T> implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() suffixContent: TemplateRef<unknown> | undefined;
  @Input() mask: string | null = null;
  @Input() disabled: boolean = false;

  @Output() blurTriggered = new EventEmitter<void>();
  @Output() focusTriggered = new EventEmitter<void>();

  private value$ = new BehaviorSubject<T | null>(null);
  public id = generateRandomId('input_');

  onChange = (value: T | null): T | null => value;
  onTouched = () => {};
  registerOnTouched = (fn: () => void) => (this.onTouched = fn);
  registerOnChange = (fn: (value: T | null) => T | null) =>
    (this.onChange = fn);

  public get value(): T | null {
    return this.value$.getValue();
  }

  public set value(value: T | null) {
    this.value$.next(value);
    this.onChange(value);
  }

  writeValue(value: T | null): void {
    this.value$.next(value);
  }

  public onBlur(): void {
    this.blurTriggered.emit();
    this.onTouched();
  }

  public onFocus(): void {
    this.focusTriggered.emit();
  }
}

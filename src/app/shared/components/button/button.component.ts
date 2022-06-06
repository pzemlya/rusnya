import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() fullWidth: boolean = false;
  @Input() disabled: boolean = false;
  @Input() isSubmitType: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}

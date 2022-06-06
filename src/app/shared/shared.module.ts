import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { InputComponent } from './components/input/input.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    ButtonComponent,
    DropDownComponent,
    InputComponent,
    ModalComponent,
  ],
  exports: [ButtonComponent, DropDownComponent, InputComponent, ModalComponent],
  imports: [CommonModule, NgxMaskModule.forChild(), FormsModule],
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'text-input-field',
  imports: [CommonModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextInputFieldComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TextInputFieldComponent),
    multi: true
  }],
  templateUrl: '../input-field/input-field.component.html',
  styleUrl: '../input-field/input-field.component.scss'
})
export class TextInputFieldComponent extends InputFieldComponent {
  override type: string = 'text';

  constructor() {
    super();
  }
  
  override validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    if (!this.value && this.required) {
      return { required: true };
    }
    return null;
  }

}

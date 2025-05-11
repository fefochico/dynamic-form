import { Component, forwardRef } from '@angular/core';
import { BaseInputFieldComponent } from '../base-input-field/base-input-field.component';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'date-input-field',
  imports: [CommonModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateInputFieldComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DateInputFieldComponent),
    multi: true
  }],
  templateUrl: '../base-input-field/base-input-field.component.html',
  styleUrl: './date-input-field.component.scss'
})
export class DateInputFieldComponent extends BaseInputFieldComponent{
  override type: string = 'date';

  constructor() {
    super();
  }

  override validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    const regexp = new RegExp(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);
    if (!this.value && this.required) return { required: true };

    if(this.value && !regexp.test(this.value.toString())) return { invalid_date: true };

    return null;
  }

}

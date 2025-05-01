import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'number-input-field',
  imports: [CommonModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberInputFieldComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NumberInputFieldComponent),
    multi: true
  }],
  templateUrl: '../input-field/input-field.component.html',
  styleUrl: '../input-field/input-field.component.scss'
})
export class NumberInputFieldComponent extends InputFieldComponent {
  override type: string = 'number';

  constructor() {
    super();
  }

  override validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    const regexp = new RegExp(/^[0-9]*$/);
    if (!this.value && this.required) return { required: true };

    if(this.value && !regexp.test(this.value.toString())) return { invalid_number: true };

    if(this.value && this.min && (this.min > Number(this.value))) {
      return { lower_than_min: true };
    }
    if(this.value && this.max && (this.max < Number(this.value))) {
      return { higher_than_max: true };
    }
    return null;
  }

}

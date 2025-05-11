import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'base-input-field',
  imports: [CommonModule],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseInputFieldComponent),
      multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => BaseInputFieldComponent),
    multi: true
  }],
  templateUrl: './base-input-field.component.html',
  styleUrl: './base-input-field.component.scss'
})
export class BaseInputFieldComponent implements ControlValueAccessor{
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() min: number | undefined;
  @Input() max: number | undefined;

  type: string = 'text';
  value: any = null;
  control!: AbstractControl;
  onChange= (value: any) => {};
  onTouched= () => {};
  //ControlValueAccessor
  writeValue(value: any): void {
    //throw new Error('Method not implemented.');
    this.value = value || '';
  }
  registerOnChange(fn: any): void {
    //throw new Error('Method not implemented.');
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    //throw new Error('Method not implemented.');
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    //throw new Error('Method not implemented.');
  }
  //Fin ControlValueAccessor

  onInput(event: any) {
    const newValue = event.target.value;
    this.value = newValue;
    this.onChange(newValue);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    if (!this.value && this.required) {
      return { required: true };
    }
    return null;
  }
}

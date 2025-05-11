import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, Input } from '@angular/core';
import { TranslateService } from '../../services/translation.service';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'select-field',
  imports: [CommonModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectFieldComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => SelectFieldComponent),
    multi: true
  }],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss'
})
export class SelectFieldComponent {
  @Input() label: string = '';
  @Input() options: { value: string, label: string }[] = [];
  @Input() required: boolean = false;
  value: any = null;
  control!: AbstractControl;
  onChange = (value: any) => {};
  onTouched = () => {};
  //ControlValueAccessor
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    //throw new Error('Method not implemented.');
  }
  //Fin ControlValueAccessor

  public translateService= inject(TranslateService);

  onSelect(event: any) {
    const newValue = event.target.value;
    this.value = newValue;
    this.onChange(newValue);
  }

  validate(control: any) {
    this.control = control;
    if (!this.value && this.required) {
      return { required: true };
    }
    return null;
  }
}

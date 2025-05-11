import { AfterViewInit, Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldConfig } from '../field-config';

@Component({
  selector: 'app-dynamic-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent implements OnInit, AfterViewInit{
  @ViewChild('fieldsContainer', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;//??
  @Input() formConfig: FieldConfig[] = [];
  @Output() result= new EventEmitter<any>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private injector: Injector){}//??

  ngOnInit(): void {
    this.form= this.fb.group({});
    this.formConfig.forEach((fieldConfig) => {
      this.form.addControl(fieldConfig.config.name, this.fb.control(fieldConfig.config.defaultValue? fieldConfig.config.defaultValue : null));
    })
  }
  
  ngAfterViewInit(): void {
    this.formConfig.forEach((fieldConfig) => {
      const componentRef = this.container.createComponent(fieldConfig.component, { injector: this.injector });
      const properties: (keyof typeof fieldConfig.config)[] = Object.keys(fieldConfig.config) as (keyof typeof fieldConfig.config)[];
      properties.forEach((property) => {
        componentRef.instance[property] = fieldConfig.config[property];  
      });

      if(fieldConfig.options) {
        componentRef.instance.options = fieldConfig.options;
      }
      const control = this.form.get(fieldConfig.config.name);
      //enlaza la informacion del FormControl con el componente
      if (control) { 
        componentRef.instance.registerOnChange((value: any) => {
          control.setValue(value);
        }
        );
        componentRef.instance.registerOnTouched(() => {
          control.markAsTouched();
        }
        );
        componentRef.instance.writeValue(control.value);
        // Intentar obtener y asignar el validador si existe
        this.setValidatonsFromFieldComponentToControl(componentRef.instance, control);
      }
      
    });
  }

  private setValidatonsFromFieldComponentToControl(instance: any, control: AbstractControl) {
    if (instance.validate) {
      const validator = function(c: AbstractControl): ValidationErrors | null {
        return instance.validate(c);
      };      
      control.setValidators(validator);
      control.updateValueAndValidity();
      instance.control = control;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.result.emit(this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }
}

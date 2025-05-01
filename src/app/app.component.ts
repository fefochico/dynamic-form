import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectFieldComponent } from './select-field/select-field.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { JsonPipe } from '@angular/common';
import { FieldConfig } from './field-config';
import { TextInputFieldComponent } from './text-input-field/text-input-field.component';
import { NumberInputFieldComponent } from './number-input-field/number-input-field.component';


@Component({
  selector: 'app-root',
  imports: [JsonPipe, FormsModule, ReactiveFormsModule, 
    DynamicFormComponent, 
    TextInputFieldComponent, 
    NumberInputFieldComponent, 
    SelectFieldComponent
  ],  // Importa los componentes aquí
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  result1: any;
  result2: any;
  localForm!: FormGroup;
  public colorOptions =  [
    { value: '1', label: 'Red' },
    { value: '2', label: 'Green' },
    { value: '3', label: 'Blue' }
  ];
  fieldsConfig: FieldConfig[] = [
    {
      defaultValue: '',
      name: 'nombre',
      label: 'Nombre',
      component: TextInputFieldComponent,
      validators: {
        required: true
      }
    },
    {
      defaultValue: '',
      name: 'edad',
      label: 'Edad',
      component: NumberInputFieldComponent,
      validators: {
        required: true,
        min: 0,
        max: 10,
      }
    },
    {
      defaultValue: "",
      name: 'colorFavorito',
      label: 'Color Favorito',
      component: SelectFieldComponent,
      validators: {
          required: true,
      },
      options: [
          { value: '1', label: 'Rojo' },
          { value: '2', label: 'Verde' },
          { value: '3', label: 'Azul' }
      ]
    }
  ];
  constructor(private fb: FormBuilder) {
    this.localForm = this.fb.group({
      name: new FormControl(''),
      edad: new FormControl(null),
      color: new FormControl(null)
    });
  }

  showResult($event:any){
    this.result1= $event
  }

  onSubmit() {
    if (this.localForm.valid) {
      this.result2= this.localForm.value;
    } else {
      console.log('Form is invalid');
    }
  }

  onChange($event: any) {
    console.log($event);
  }
}

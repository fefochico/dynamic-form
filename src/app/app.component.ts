import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectFieldComponent } from './fields/select-field/select-field.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { JsonPipe } from '@angular/common';
import { FieldConfig } from './field-config';
import { TextInputFieldComponent } from './fields/text-input-field/text-input-field.component';
import { NumberInputFieldComponent } from './fields/number-input-field/number-input-field.component';
import { TranslateService } from './services/translation.service';
import { DateInputFieldComponent } from './fields/date-input-field/date-input-field.component';


@Component({
  selector: 'app-root',
  imports: [
    JsonPipe, 
    FormsModule, 
    ReactiveFormsModule, 
    DynamicFormComponent, 
    TextInputFieldComponent, 
    NumberInputFieldComponent, 
    SelectFieldComponent,
    DateInputFieldComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  result1: any;
  result2: any;
  localForm!: FormGroup;
  minStartDateInEndDate: Date | null = null;
  public colorOptions =  [
    { value: '1', label: 'Red' },
    { value: '2', label: 'Green' },
    { value: '3', label: 'Blue' }
  ];
  fieldsConfig: FieldConfig[] = [
    {
      component: TextInputFieldComponent,
      config: {
        defaultValue: '',
        name: 'nombre',
        label: 'Nombre',
        required: true
      }
    },
    {
      component: NumberInputFieldComponent,
      config: {
        defaultValue: '',
        name: 'edad',
        label: 'Edad',
        required: true,
        min: 0,
        max: 10,
      }
    },
    {
      component: SelectFieldComponent,
      config: {
        defaultValue: "",
        name: 'colorFavorito',
        label: 'Color Favorito',
        required: true,
      },
      options: [
          { value: '1', label: 'Rojo' },
          { value: '2', label: 'Verde' },
          { value: '3', label: 'Azul' }
      ]
    }
  ];
  constructor(private fb: FormBuilder, private translateService: TranslateService) {
    this.localForm = this.fb.group({
      name: new FormControl(''),
      edad: new FormControl(null),
      color: new FormControl(null),
      fechainicio: new FormControl(null),
      fechafin: new FormControl(null),
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

  onChangeStartDate(){
    this.minStartDateInEndDate = this.localForm.get('fechainicio')?.value;
  }

  getMinDate(){
    return this.localForm.get('fechainicio')?.value;
  }
}

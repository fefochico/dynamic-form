import { Type } from "@angular/core";

export interface FieldConfig {
    defaultValue: any;
    name: string;
    label: string;
    component: Type<any>;
    validators?: { 
        required?: boolean;
        min?: number;
        max?: number;
     };
    options?: { value: string, label: string }[]; // For select fields
}

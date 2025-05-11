import { Type } from "@angular/core";

export interface FieldConfig {
    
    component: Type<any>;
    config: {
        name: string;
        defaultValue?: any;
        id?: string;
        label?: string;
        required?: boolean;
        min?: number;
        max?: number;
    }
    options?: { value: string, label: string }[]; // For select fields
}

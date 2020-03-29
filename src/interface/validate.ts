namespace App {
  export interface Validatable {
    value: string | number;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    max?: number;
    min?: number;
  }
}

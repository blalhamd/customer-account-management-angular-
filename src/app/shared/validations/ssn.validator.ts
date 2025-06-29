import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom SSN validator (example: 14 digits)
export function ssnValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return { required: true };
    return /^[0-9]{14}$/.test(value) ? null : { invalidSSN: true };
  };
}

import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // don't validate empty value (use Validators.required if needed)
    }

    const isValidLength = control.value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasNumber = /\d/.test(control.value);

    const passwordValid =
      isValidLength && hasUpperCase && hasLowerCase && hasNumber;

    return !passwordValid
      ? {
          passwordStrength: {
            valid: false,
            requirements: {
              minLength: !isValidLength,
              hasUpperCase: !hasUpperCase,
              hasLowerCase: !hasLowerCase,
              hasNumber: !hasNumber,
            },
          },
        }
      : null;
  };
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const urlPattern = /^(https?:\/\/[^\s]+)/i; // Patrón simple para validar URLs
    const valid = urlPattern.test(control.value);
    return valid ? null : { invalidUrl: true };
  };
}

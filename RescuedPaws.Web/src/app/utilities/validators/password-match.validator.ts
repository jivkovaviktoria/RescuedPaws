import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('passwordControl')?.value;
      const confirmPassword = control.get('confirmPasswordControl')?.value;
      return password && confirmPassword && password === confirmPassword ? null : { 'passwordMismatch': true };
    };
  }
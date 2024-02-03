import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const confirmPass: ValidatorFn = (control: AbstractControl): ValidationErrors | null => 
    control.get('password').value !== control.get('confirm-pass').value ? 
    {missMatch: true} : null;

export const emailValidator = (email: RegExp): ValidatorFn => 
    (control: AbstractControl): ValidationErrors | null => email.test(control.value) ? null : { invalidEmail: true };

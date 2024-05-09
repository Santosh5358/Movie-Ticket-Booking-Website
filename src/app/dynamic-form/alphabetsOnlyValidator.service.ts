import { AbstractControl, ValidatorFn } from '@angular/forms';

export function alphabetsOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const alphabetsOnlyRegex = /^[a-zA-Z\s]+$/; // Only alphabets allowed
    const valid = alphabetsOnlyRegex.test(control.value);
    return valid ? null : { alphabetsOnly: true };
  };
}

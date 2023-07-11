import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FileValidator {
  static fileType(allowedTypes: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        console.log('conteol', control, control.value)
        const extension = control.value.split('.').pop()?.toLowerCase();

        if (extension && !allowedTypes.includes(extension)) {
          return { fileType: true };
        }
      }

      return null;
    };
  }

  // static fileSize(maxSizeInMB: number) {
  //   const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (control.value) {
  //       const file: File = control.value;
  //       console.log('file', file)
  //       if (file.size > maxSizeInBytes) {
  //         return { fileSize: true };
  //       }
  //     }

  //     return null;
  //   };
  // }
}

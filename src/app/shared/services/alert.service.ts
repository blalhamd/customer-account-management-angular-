import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(message: string, title: string = 'Success') {
    Swal.fire({
      icon: 'success',
      title,
      text: message,
      // toast: true,
      // position: 'top-end',
      timer: 3000,
      showConfirmButton: true,
    });
  }

  error(message: string, title: string = 'Error') {
    Swal.fire({
      icon: 'error',
      title,
      text: message,
      toast: true,
      // position: 'top-end',
      timer: 3000,
      showConfirmButton: true,
    });
  }

  confirm(message: string, title: string = 'Are you sure?') {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });
  }
}

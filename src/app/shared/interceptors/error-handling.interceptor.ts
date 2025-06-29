import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage =
        'An unexpected error occurred. Please try again later.';

      switch (error.status) {
        case 400:
          errorMessage =
            error.error?.message ||
            error.error?.Message ||
            'Bad request. Please check your input.';
          break;
        case 401:
          // Prefer the backend error message if present
          errorMessage =
            error.error?.message ||
            error.error?.Message ||
            'Session expired. Please log in again.';
          authService.logout();
          router.navigate(['/auth/login'], {
            queryParams: { returnUrl: req.url },
          });
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'Requested resource not found.';
          break;
        case 500:
          errorMessage = 'Server error. Please contact support.';
          break;
      }

      console.error(`HTTP Error [${error.status}]:`, error);

      errorService.setError(errorMessage);

      return throwError(() => new Error(errorMessage));
    })
  );
};

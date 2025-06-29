import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  var authService = inject(AuthService);
  var router = inject(Router);

  if (authService.isLoggedIn()) return true;
  else {
    router.navigate(['/auth/login']);
    return false;
  }
};

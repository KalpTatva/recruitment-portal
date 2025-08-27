import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../../../Service/auth.services';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServices);
  const router = inject(Router);

  if(authService.isLoggedIn()) {
    return false;
  }
  return true;

};

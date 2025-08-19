import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../../../features/auth/services/auth.services';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServices);
  const router = inject(Router);

  // Check login
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Check role
  const expectedRoles = route.data['roles'] as Array<string>;
  const userRole = authService.getRole();

  if (expectedRoles && !expectedRoles.includes(userRole ?? '')) {
    // if role not allowed then redirect to unauthorized
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};



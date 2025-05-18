import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authentificationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  let router = inject(Router);
  if(authService.isAuthenticated){
    return true;
  }
  router.navigateByUrl("/login");
  return false;
};

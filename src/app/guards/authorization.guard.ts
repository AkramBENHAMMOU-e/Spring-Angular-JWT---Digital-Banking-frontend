import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  
  if(authService.roles.includes("ADMIN")){
    return true;
  }
  return false;
};

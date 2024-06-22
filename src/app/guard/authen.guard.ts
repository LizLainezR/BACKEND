import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { filter, map, take } from 'rxjs';
import { inject } from '@angular/core';
 
export const autoLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  return loginService.isAuthenticated$.pipe(
    filter(val => val !== null), // Filtra valores nulos
    take(1), // Toma solo el primer valor emitido
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      }
      return true; 
    })
  );





  
};



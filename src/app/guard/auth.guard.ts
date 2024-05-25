import { AuthService } from './../service/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { filter, map, take } from 'rxjs';
import { Menu } from '../model/menu-model';
import { UserData } from '../model/user-model';
import { CODE_LS_MENU, CODE_LS_USER } from '../conts/ferre-conts';

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

export const authenticatedGuard: CanActivateFn = (route, segments) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const authService = inject(AuthService); // Importa y asigna el AuthService
  
  return loginService.isAuthenticated$.pipe( 
    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        const optionMenus: Menu[] = JSON.parse(localStorage.getItem(CODE_LS_MENU)!);
        const user: UserData = JSON.parse(localStorage.getItem(CODE_LS_USER)!);
        authService.setUserData(user); // Usa el authService aquí
        if (optionMenus) {
          authService.setUserMenu(optionMenus); // Usa el authService aquí
        }
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );}
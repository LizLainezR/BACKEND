import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../service/login.service';

export const erroresInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService = inject(LoginService);

  return next(req).pipe(
    catchError((error) => {
      if ([401].includes(error.status) && error.error?.error === 'TOKEN_EXPIRED') {
        console.log('TOKEN_EXPIRED');
        loginService.logout();
      } else if ([401, 403].includes(error.status)) {
        console.log('Unauthorized request');
      } else if ([404].includes(error.status)) {
        console.log('Not found');
      } else {
        console.log(`Unexpected error: ${error.statusText}`);
      }
      const e = error.error?.message || error.statusText || 'Unknown error';
      console.error('ERROR: ' + e);

      return throwError(() => new Error(e));
    })
  );
};

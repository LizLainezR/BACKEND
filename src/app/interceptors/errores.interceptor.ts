import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoginService } from '../service/login.service';

export const erroresInterceptor: HttpInterceptorFn = (req, next) => {
  const loginService=inject(LoginService)
  return next(req).pipe(catchError((error)=>{
    if([401].includes(error.status) && error.error.error==='TOKEN_EXPIRED'){

      console.log(error.error.error)
      loginService.logout()
    }
    
    else if([401,403].includes(error.status)){
      console.log('Unautorized request');

    }else if([404].includes(error.status)){
      console.log("Not found");
      
    }
    const e = error.error.message || error.statusText;
    console.log('ERRORES'+e)
    
    return throwError(()=>error)
  }));
};

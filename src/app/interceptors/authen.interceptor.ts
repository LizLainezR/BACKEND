import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../service/login.service';
import { inject } from '@angular/core';
import { CODE_LS_TOKEN } from '../conts/ferre-conts';
import { catchError, of, switchMap, throwError } from 'rxjs';

export const authenInterceptor: HttpInterceptorFn = (req, next) => {
  const isLogin$=inject(LoginService)
  if(isLogin$.isAuthenticated$.value){
    const clonedReq=req.clone({
      headers: req.headers.set(
        'Authorization', `Bearer ${localStorage.getItem(CODE_LS_TOKEN)}`
        )
      })
      return next(clonedReq);
    }else{
    return next(req);

  }};

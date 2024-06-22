import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

const stopLoader=(added:number)=>{
  added--
  if(added===0){
   // console.log("finalizar loader");
  }
  return added
}
export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  authService.crementActiveRequests();
  return next(req).pipe(finalize(() => { 
    authService.dcrementActiveRequests();
    console.log("iniciar");
  })); 
};

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
  // Incrementa el contador de solicitudes activas
  authService.incrementActiveRequests();
  console.log("iniciar loader");
 
 
  return next(req).pipe(finalize(() => {
    console.log("iniciar  4444");
    // Decrementa el contador de solicitudes activas y detiene el loader si es necesario
    authService.decrementActiveRequests();
    console.log("iniciar");
  })); 
};

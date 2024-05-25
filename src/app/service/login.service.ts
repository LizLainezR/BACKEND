import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { UserAuthenticationResponse, UserCredentials } from '../model/user-model';
import { CODE_LS_MENU, CODE_LS_TOKEN, CODE_LS_USER } from '../conts/ferre-conts';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadToken();
  }

  authenticate(credentials: UserCredentials): Observable<UserAuthenticationResponse> {
   return this.http.post<UserAuthenticationResponse>(`${environment.API_URL}/login`, credentials).pipe(
      tap((response: UserAuthenticationResponse) => {
        console.log(response);
        if (response.jwt) {         
          console.log(" VALIDADO token",response.jwt);
          this.setLocalStorage(CODE_LS_TOKEN, response.jwt);
          this.authService.setUserData(response.user);
        //  console.log("Authservice"+ this.authService.setUserData(response.user));
        //this.authService.setUserMenu(response.menu);
          this.isAuthenticated$.next(true);
        } else {
          console.error('Error de autenticación:', response.msj);
        }
      })
    );
  }

  private loadToken(): void {
    const token = this.getLocalStorage(CODE_LS_TOKEN);
    console.log("load token: "+token)
    if (token) {
      this.isAuthenticated$.next(true);
      console.log("token: cargado y existe"+token)
    }
  }

  logout(): void {
    this.removeLocalStorage(CODE_LS_TOKEN);
    this.authService.clearUserData();
    this.authService.clearUserMenu();
    this.isAuthenticated$.next(false);
  }

  // Funciones para acceder a localStorage de forma segura
  private setLocalStorage(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  private getLocalStorage(key: string): string | null {
    return this.isLocalStorageAvailable() ? localStorage.getItem(key) : null;
  }

  private removeLocalStorage(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test_local_storage__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}

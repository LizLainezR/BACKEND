import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserAuthenticationResponse, UserCredentials } from '../model/user-model';
import { CODE_LS_MENU, CODE_LS_TOKEN, CODE_LS_USER } from '../conts/ferre-conts';
import { PermissionMenu } from '../model/menu-model';

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
      if (response.jwt) {             
        this.setLocalStorage(CODE_LS_TOKEN, response.jwt);
        this.setLocalStorage(CODE_LS_USER, JSON.stringify(response.user));
        this.authService.setUserData(response.user);
        this .fetchUserMenu(response.user.id_role);
        this.isAuthenticated$.next(true);     
        } else {
          console.error('Error de autenticación:', response.msj);
        }
      })
    );
  }

  fetchUserMenu(id_role: number): void {
    this.authService.getMenuByRole(id_role).subscribe(
      (modules: PermissionMenu[]) => {
        this.setLocalStorage(CODE_LS_MENU, JSON.stringify(modules));
        this.authService.setUserMenu(modules);
      }
    );
  }

  private loadMenuFromLocalStorage(): void {
    const menuJson = this.getLocalStorage(CODE_LS_MENU);
    if (menuJson) {
      const menu = JSON.parse(menuJson) as PermissionMenu[];
      this.authService.setUserMenu(menu);
    }
  }  
  
  private loadToken(): void {
    const token = this.getLocalStorage(CODE_LS_TOKEN);
    if(token){
      this.isAuthenticated$.next(true);
      this.loadMenuFromLocalStorage();
     }
  }

  logout(): void {
    this.removeLocalStorage(CODE_LS_TOKEN);
    this.removeLocalStorage(CODE_LS_USER);
    this.removeLocalStorage(CODE_LS_MENU);
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

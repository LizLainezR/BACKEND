import { Injectable, signal } from '@angular/core';
import { RespuestaSubmodule, Permission, RespuestaModule, PermissionMenu } from '../model/menu-model';
import { UserData } from '../model/user-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CODE_LS_TOKEN } from '../conts/ferre-conts';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData$ = new BehaviorSubject<UserData | null>(null);
  private userMenu$ = new BehaviorSubject<PermissionMenu[]>([]);
  private activeRequests = 0;
  constructor(private http: HttpClient) {}

  getMenuByRole(roleId: number): Observable<PermissionMenu[]> {
      return this.http.get<PermissionMenu[]>(`${environment.API_URL}/menu/${roleId}`);
  }

  getUserData(): BehaviorSubject<UserData | null> {
    return this.userData$;
  }

  setUserMenu(menu: PermissionMenu[]): void {
    this.userMenu$.next(menu);
  }

  getUserMenu(): BehaviorSubject<PermissionMenu[]> {
    return this.userMenu$;
  }

  setUserData(user: UserData): void {
    this.userData$.next(user);
  }

  clearUserData(): void {
    this.userData$.next(null);
  }

  clearUserMenu(): void {
    this.userMenu$.next([]);
  }
 crementActiveRequests(): void {
  this.activeRequests++;}

  dcrementActiveRequests(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;}
  }

}

import { Injectable, signal } from '@angular/core';
import { Menu } from '../model/menu-model';
import { UserData } from '../model/user-model';
import { BehaviorSubject } from 'rxjs';
import { CODE_LS_TOKEN } from '../conts/ferre-conts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData$ = new BehaviorSubject<UserData | null>(null);
  private userMenu$ = new BehaviorSubject<Menu[]>([]);
  private activeRequests = 0;
  constructor() { }

  getUserData(): BehaviorSubject<UserData | null> {
    return this.userData$;
  }

  setUserMenu(menu: Menu[]): void {
    this.userMenu$.next(menu);
  }

  getUserMenu(): BehaviorSubject<Menu[]> {
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
  

  incrementActiveRequests(): void {
    this.activeRequests++;
    console.log("holi aqui"+this.activeRequests);
    // Aquí podrías mostrar el loader si lo deseas
  }

  decrementActiveRequests(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
      console.log("repuestas"+this.activeRequests)
    }
    // Aquí podrías detener el loader si el contador de solicitudes activas es cero
  }

}

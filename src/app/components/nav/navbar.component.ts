import { LoginService } from './../../service/login.service';
import { Component, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  public isCollapsed = true;
  showDropdown: boolean = false;
  userName: string = '';

  constructor(private router: Router, private authService: AuthService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe((userData) => {
      this.userName = userData ? userData.username : '';
    });
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.loginService.logout(); // Llama al método de cerrar sesión del servicio de inicio de sesión
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión después de cerrar sesión
  }
}

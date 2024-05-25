import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { NavbarComponent } from '../../components/nav/navbar.component';
import { CommonModule } from '@angular/common';
import { CustomSidebarComponent } from '../../components/custom-sidebar/custom-sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,CustomSidebarComponent, FormsModule, ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  isSidebarCollapsed = false;

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  logout() {
    this.loginService.logout(); // Llama al método de cerrar sesión del servicio de login
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión después de cerrar sesión
  }
}

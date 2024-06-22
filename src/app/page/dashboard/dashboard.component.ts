import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { NavbarComponent } from '../../components/nav/navbar.component';
import { CustomSidebarComponent } from '../../components/custom-sidebar/custom-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalRegisCustComponent } from '../../components/modal-regis-cust/modal-regis-cust.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,FooterComponent,CustomSidebarComponent,NavbarComponent,CommonModule,ReactiveFormsModule, ModalRegisCustComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  isSidebarCollapsed = false;

  logout() {
    this.loginService.logout(); // Llama al método de cerrar sesión del servicio de login
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión después de cerrar sesión
  }

  irAPuntoDeVenta() {
    this.router.navigate(['/punto-ventas']);  }
}

import { Component, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NavigationEnd, Router, RouterEvent, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CUSTOM_ROUTES } from '../custom-sidebar/custom-sidebar.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {public isCollapsed = true;
  showDropdown: boolean = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
}

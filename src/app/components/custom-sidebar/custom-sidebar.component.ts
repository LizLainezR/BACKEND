import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

// Definición de las rutas
export const CUSTOM_ROUTES: RouteInfo[] = [
  { path: '/custom-dashboard', title: 'Custom Dashboard',  icon: 'custom_icon_dashboard', class: '' },
  { path: '/custom-icons', title: 'Custom Icons',  icon:'custom_icon_atom', class: '' },
  { path: '/custom-maps', title: 'Custom Maps',  icon:'custom_icon_map', class: '' },
  { path: '/custom-notifications', title: 'Custom Notifications',  icon:'custom_icon_bell', class: '' },

  { path: '/custom-user-profile', title: 'Custom User Profile',  icon:'custom_icon_user', class: '' },
  { path: '/custom-table-list', title: 'Custom Table List',  icon:'custom_icon_bullet-list', class: '' },
  { path: '/custom-typography', title: 'Custom Typography',  icon:'custom_icon_text', class: '' },
  { path: '/custom-upgrade', title: 'Custom Upgrade to PRO',  icon:'custom_icon_spaceship', class: 'active active-pro' }
];
@Component({
  selector: 'app-custom-sidebar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './custom-sidebar.component.html',
  styleUrl: './custom-sidebar.component.css'
})
export class CustomSidebarComponent { 
  isOpen: boolean = false;
  menuItems: any[] = [];

 // constructor(private menuService: MenuService) { }

  ngOnInit(): void {
 /*   this.menuService.getMenuItems().subscribe(data => {
      this.menuItems = data.items;
    });*/
  }

  toggleSidebar(state: boolean): void {
    this.isOpen = state;
  }

  toggleSubMenu(item: any): void {
    if (item.submenu) {
      item.open = !item.open;
    }
  }
}

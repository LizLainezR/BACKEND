import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PermissionMenu} from '../../model/menu-model';
import { AuthService } from '../../service/auth.service';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;}
@Component({
  selector: 'app-custom-sidebar',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './custom-sidebar.component.html',
  styleUrl: './custom-sidebar.component.css'
})

export class CustomSidebarComponent { 
  isOpen: boolean = false;
  menuItems: PermissionMenu[] = [];
  roleId: number | undefined;
  selectedModuleId: number | null = null;

  constructor(private menuService: AuthService) {}

  ngOnInit() {
    this.menuService.getUserMenu().subscribe((ArrayPer: PermissionMenu[]) => {
      this.menuItems = ArrayPer;
       console.log(this.menuItems);
    });
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  toggleSidebar(state: boolean): void {
    this.isOpen = state;
  }

  onModuleClick(moduleId: number) {
    this.selectedModuleId = this.selectedModuleId === moduleId ? null : moduleId; // Alternar selección
  }

  hasSubmodules(moduleId: number): boolean {
    return this.menuItems.some((item) => item.id_submodule === moduleId);
  }

  toggleSubmodules(event: any): void {
    const moduleElement = event.currentTarget;
    moduleElement.classList.toggle('show-submodules');
  }
}

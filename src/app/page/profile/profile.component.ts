import { Component } from '@angular/core';
import { UserData } from '../../model/user-model';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  showModal: boolean = false;
  editSection: string = '';
  
  //user: UserData;

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    // Suponiendo que el UserService tiene un método para obtener los datos del usuario
    /*this.userService.getUserData().subscribe(
      (userData: UserData) => {
        this.user = userData;
      },
      (error) => {
        console.error('Error al cargar los datos del usuario:', error);
      }
    );*/
  }

  openEditModal(section: string): void {
    this.editSection = section;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editSection = '';
  } 
}

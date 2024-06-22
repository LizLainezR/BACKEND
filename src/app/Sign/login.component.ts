import { Component } from '@angular/core';
import { FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from '../components/footer/footer.component';
import { UserAuthenticationResponse, UserCredentials } from '../model/user-model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,FontAwesomeModule,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  formCredentials!: FormGroup;
  type = "password";
  passwordVisible: boolean = false;
  remembe_me: boolean = false; 
  
  errorMessage = {
    password: [
      { id: 1, type: 'required', message: 'La contraseña es obligatoria' },
      { id: 2, type: 'maxlength', message: 'La contraseña debe tener máximo 20 caracteres' },
      { id: 3, type: 'minlength', message: 'La contraseña debe tener mínimo 6 caracteres' },
      { id: 4, type: 'pattern', message: 'La contraseña debe contener letras y números' },
    ],
    username: [
      { id: 1, type: 'required', message: 'El nombre de usuario es obligatorio' },
      { id: 2, type: 'maxlength', message: 'El nombre de usuario debe tener máximo 15 caracteres' },
      { id: 3, type: 'minlength', message: 'El nombre de usuario debe tener mínimo 4 caracteres' },
      { id: 4, type: 'pattern', message: 'El nombre de usuario solo puede contener letras y números' },
    ],
  };

  constructor(private fb: FormBuilder, private loginService: LoginService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formCredentials = this.fb.group({
      username: ['liz_lainez', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        Validators.pattern('^[a-zA-Z0-9_-]+$')
      ]],
      password: ['Aleatorio123!', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&]).+$')
      ]],
      remember_me: [false]
    });
  }

  onSubmitForm() {
    if (this.formCredentials.valid) {
       const credentials: UserCredentials = this.formCredentials.value;
      if (this.remembe_me){
        credentials.remembe_me = true;
      } 
        this.loginService.authenticate(credentials).subscribe((
            response: UserAuthenticationResponse) => {
            this.authService.setUserData(response.user);
            this.router.navigate(['/dashboard']);
          },
        error => {
          console.error('Error de autenticación:', error);
        }
      );
    } else {
      console.log('Formulario inválido. No se envían credenciales.');
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    this.type = this.passwordVisible ? "text" : "password";
  }

  toggleRememberMe(): void {
    this.remembe_me = !this.remembe_me;
  }

}
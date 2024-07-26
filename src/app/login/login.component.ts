import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../components/modalLogin/modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authService';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  showAlert: boolean = false;
  alertTitle: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  passwordFieldType: string = 'password';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verifica si ya hay un token en el localStorage
    const token = localStorage.getItem('authToken');
    console.log('Token en ngOnInit:', token); // Verifica el valor del token
    if (token) {
      // Redirige si ya hay un usuario autenticado
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.showAlertModal('error', 'Please fill in all fields correctly.');
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('authToken', response.token); // Guardar el token en localStorage
        localStorage.setItem('user', JSON.stringify(response.user)); // Asegúrate de que `response.user` tenga los datos correctos
        localStorage.setItem('user_id', response.user.id.toString())
        this.showAlertModal('success', 'Login successful');
        
        // Retrasa el redireccionamiento para permitir que el modal se cierre
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 3000); // Debe coincidir con el tiempo del modal
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.showAlertModal('error', 'Login failed');
      }
    });
  }
  
  private showAlertModal(type: 'success' | 'error', message: string) {
    console.log('Show alert modal with type:', type);
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;  // Cerrar el modal después de un tiempo
    }, 3000); // Cambié el tiempo a 3 segundos para que el usuario pueda leer el mensaje
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Asegúrate de que esta ruta esté configurada
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}

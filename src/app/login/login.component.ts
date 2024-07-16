import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';  
import { AuthService } from '../../service/authService';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../components/modalLogin/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  showAlert: boolean = false;
  alertTitle: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor( private fb: FormBuilder, private authService : AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
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

    const userData = this.loginForm.value;

    this.authService.loginUser(userData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem('user', JSON.stringify(response.user))
        console.log('Login response:', response);
        console.log(localStorage.getItem('user'));
        this.showAlertModal('success', 'Login successful');
        this.router.navigate(['/dashboard']);
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

    // Forzar la actualización del moda
    setTimeout(() => {
      this.showAlert = false;  // Cerrar el modal después de un tiempo
    }, 1000);
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Asegúrate de que esta ruta esté configurada
  }
}
  



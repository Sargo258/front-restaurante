import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authService';
import { ModalComponent } from '../components/modalLogin/modal.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ModalComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showModal: boolean = false; // Control del modal

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.showAlertModal('error', 'Please fill in all fields correctly.');
      return;
    }

    const userData = this.registerForm.value;

    this.authService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.showAlertModal('success', 'Registration successful!');
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.showAlertModal('error', 'Registration failed. Please try again.');
      }
    });
  }

  private showAlertModal(type: 'success' | 'error', message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showModal = true;

    setTimeout(() => {
      this.showModal = false; // Cerrar el modal después de un tiempo
    }, 2000); // Tiempo en milisegundos
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Ajusta la ruta según tu configuración
  }
}

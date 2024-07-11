import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';  
import { AuthService } from '../../service/authService';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {
  
  loginForm: FormGroup;
  showAlert: boolean = false;
  alertTitle: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';

  constructor( private fb: FormBuilder, private authService : AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    const userData = this.loginForm.value;

    this.authService.loginUser(userData).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.showAlertModal('success', 'Login successful');

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
  
  }
}
  



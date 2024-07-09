import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';  
import { AuthService } from '../../service/authService';
import { Observer } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {
  
  loginForm: FormGroup;

  constructor( private fb: FormBuilder, private authService : AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;

      const observer: Observer<any> = {
        next: (response) => {
          console.log('Login successful', response);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
        complete: () => {
          // Puedes manejar la lógica para cuando la subscripción se complete, si es necesario.
        }
      };

      this.authService.loginUser(userData).subscribe(observer);
    }
  }
  }


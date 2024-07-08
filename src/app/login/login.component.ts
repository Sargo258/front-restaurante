import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';  
import { AuthService } from '../../service/authService';
import { Observer } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, HttpClientModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor( private authService : AuthService) {}

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const userData = {
        email: loginForm.value.email,
        password: loginForm.value.password
      };

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


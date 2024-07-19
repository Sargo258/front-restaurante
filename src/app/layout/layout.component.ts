import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {

  isMenuOpen = false;
  user: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      this.user = null;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.user = null;
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }

  isAdmin() {
    return this.user && this.user.role === 'admin';
  }
}

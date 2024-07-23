import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { AdminGuard } from './auth/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadComponent: () => import('./Home/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)},
      { path: 'add-menu', loadComponent: () => import('./add-menu/add-menu.component').then(m => m.AddMenuComponent), canActivate: [AdminGuard] },
      { path: 'menu', loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent)},
      { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)},
    ],
    canActivate: [authGuard]
  },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' }
];

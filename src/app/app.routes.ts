import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { AddMenuComponent } from './add-menu/add-menu.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadComponent: () => import('./Home/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'about', loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) },
      { path: 'add-menu', loadComponent: () => import('./add-menu/add-menu.component').then(m => m.AddMenuComponent)  },
      // Agrega más rutas hijas aquí
    ], canActivate: [authGuard]
  },
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: 'login' }

];


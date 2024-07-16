import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', loadComponent: () => import('./Home/dashboard.component').then(m => m.DashboardComponent) },
      // Agrega más rutas hijas aquí
    ], canActivate: [authGuard]
  },
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: 'login' }

];


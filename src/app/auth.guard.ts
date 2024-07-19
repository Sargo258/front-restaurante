import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/authService';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Obtén una instancia de AuthService

  if (authService.isAuthenticated()) {
    return true; // Permitir el acceso a la ruta
  } else {
    // Redirige al usuario a la página de login si no está autenticado
    const router = inject(Router);
    router.navigate(['/login']);
    return false; // Bloquear el acceso a la ruta
  }
};

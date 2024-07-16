import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/authService';

export const authGuard: CanActivateFn = (route, state) => {
  const userData = localStorage.getItem('user');
  return !!userData; // Retorna true si hay datos de usuario, false si no
};

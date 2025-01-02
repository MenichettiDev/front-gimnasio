import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service'; // Asegúrate de ajustar la ruta


export const guardsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Permite el acceso si está logueado
  } else {
    router.navigate(['/main']); 
    return false; // Bloquea el acceso
  }
};


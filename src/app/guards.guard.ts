import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service'; // Asegúrate de ajustar la ruta
import { map, tap } from 'rxjs/operators';

export const guardsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.loggedIn$.pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        console.log( 'user logueado ');
        return true; // Permite el acceso si está logueado
      } else {
        console.log( 'user sin loguear ');
        router.navigate(['/login/home']); // Redirige al login si no está logueado
        return false; // Bloquea el acceso
      }
    })
  );
};

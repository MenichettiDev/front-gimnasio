import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { environment } from '../../environments/environment'; // Ajusta la ruta según tu estructura

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.apiUrl; // Usa la URL del entorno

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  login(usuario: string, contrasenia: string) {
    return this.http.post(`${this.apiUrl}/login`, { usuario, contrasenia }).subscribe(
      (response: any) => {
        console.log('Respuesta del backend:', response); // Log para depuración
  
        if (!response) {
          console.error('La respuesta del backend está vacía');
          throw new Error('Hubo un problema al intentar iniciar sesión.');
        }
  
        this.authService.saveUser(response);
        this.router.navigate(['/inicio/resumen']); // Redirige al usuario
      },
      (error) => {
        console.error('Error de login', error);
        if (error.status === 401) {
          throw new Error('Credenciales incorrectas.');
        } else {
          throw new Error('Hubo un problema al intentar iniciar sesión. Por favor, intente nuevamente.');
        }
      }
    );
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Para manejar estados dinámicos

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'loggedInUser'; // Clave para guardar los datos en localStorage

  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn()); // Estado inicial: se obtiene si está logueado o no
  loggedIn$ = this.loggedIn.asObservable(); // Exponer como observable para que otros componentes puedan suscribirse

  constructor() { }

  // Guardar los datos del usuario en localStorage y actualizar el estado
  saveUser(user: any): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.loggedIn.next(true);
  }

  getUser(): any | null {
    const userData = sessionStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.USER_KEY);
  }

  logout(): void {
    sessionStorage.removeItem(this.USER_KEY);
    this.loggedIn.next(false);
    console.log('Sesión cerrada automáticamente');
  }

  // Obtener el ID persona (si existe)
  getIdPersona(): number | null {
    const user = this.getUser();
    return user && user.id_persona ? user.id_persona : null;
  }
  // Obtener el id_acceso
  getIdAcceso(): number | null {
    const user = this.getUser();
    return user && user.id_acceso ? user.id_acceso : null;
  }

  // Obtener el ID del entrenador (si existe)
  getIdEntrenador(): number | null {
    const user = this.getUser()[0];
    return user && user.id_entrenador ? user.id_entrenador : null;
  }

  // Obtener el ID del atleta (si existe)
  getIdAtleta(): number | null {
    const user = this.getUser()[0];
    return user && user.id_atleta ? user.id_atleta : null;
  }

  // Obtener el ID del gimnasio (si existe)
  getIdGimnasio(): number | null {
    const user = this.getUser();
    return user && user.id_gimnasio ? user.id_gimnasio : null;
  }

  // Verificar si el usuario es un entrenador
  isEntrenador(): boolean {
    return !!this.getIdEntrenador();
  }

  // Verificar si el usuario es un atleta
  isAtleta(): boolean {
    return !!this.getIdAtleta();
  }

  // Verificar si el usuario es un gimnasio
  isGimnasio(): boolean {
    return !!this.getIdGimnasio();
  }
}

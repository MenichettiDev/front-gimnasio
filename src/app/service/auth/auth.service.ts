import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Para manejar estados dinámicos
import { Entrenador } from '../../data/interfaces/entrenadorInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'loggedInUser'; // Clave para guardar los datos en localStorage

  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn()); // Estado inicial: se obtiene si está logueado o no
  loggedIn$ = this.loggedIn.asObservable(); // Exponer como observable para que otros componentes puedan suscribirse

  constructor() {}

  // Guardar los datos del usuario en localStorage y actualizar el estado
  saveUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.loggedIn.next(true); // Cambiar el estado de login a 'true' cuando el usuario se loguea
  }

  // Obtener los datos del usuario desde localStorage
  getUser(): any | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  // Verificar si hay un usuario logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  // Eliminar los datos del usuario (logout) y actualizar el estado
  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.loggedIn.next(false); // Cambiar el estado de login a 'false' cuando el usuario se desloguea
  }
}

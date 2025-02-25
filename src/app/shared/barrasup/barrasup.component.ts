import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-barrasup',
  imports: [CommonModule, RouterModule],
  templateUrl: './barrasup.component.html',
  styleUrls: ['./barrasup.component.css']
})
export class BarrasupComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private loginStatusSubscription: Subscription | null = null; // Inicialización con null

  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Suscribirse al observable loggedIn$ para mantener el estado actualizado
    this.loginStatusSubscription = this.authService.loggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn; // Actualiza el estado de login cuando cambia
      }
    );
  }

  ngOnDestroy(): void {
    // Limpieza de la suscripción al destruir el componente
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  // Método para realizar logout
  logout(): void {
    this.authService.logout(); // Llama a logout() en el AuthService
    console.log('Usuario deslogueado');
    if (this.router.url === '/home') {
      window.location.reload();
    } else {
      // this.router.navigate(['/home']);
      window.location.href = 'login/home';
    }
  }

  // Método para redirigir al login
  login(): void {
    // this.router.navigate(['/login/login']); 
    window.location.href = '/login/login'; // Asume que tienes una ruta para login
  }
}

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barrasup',
  imports: [CommonModule, RouterModule],
  templateUrl: './barrasup.component.html',
  styleUrl: './barrasup.component.css'
})
export class BarrasupComponent {

constructor( private router:Router, public authService: AuthService) { }

  navigateToLogin() {
    this.router.navigate(['/login']);  // Redirige a la ruta de login
  }

  logout(): void {
    this.authService.logout(); // Llamar al método logout() del AuthService
    console.log('Usuario deslogueado');
    if (this.router.url === '/home') {
      window.location.reload();
    } else {
      this.router.navigate(['/home']);
    }
  }

  // Método para redirigir al login (si no está autenticado)
  login(): void {
    this.router.navigate(['/login']);  // Asumimos que tienes una ruta de login
  }

}

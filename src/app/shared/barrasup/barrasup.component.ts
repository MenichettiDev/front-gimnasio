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
export class BarrasupComponent implements OnInit {
  isLoggedIn: boolean = false;  // Este flag se mantiene solo para manejar el Login

  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Solo nos suscribimos al estado de login para manejar la visibilidad del botón de login
    this.authService.loggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn; // Actualiza el estado de login cuando cambia
      }
    );
  }

  // Método para redirigir al login
  login(): void {
    // this.router.navigate(['/login']); 
    // window.location.href = '/login'; // Asume que tienes una ruta para login
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
    });
  }
}

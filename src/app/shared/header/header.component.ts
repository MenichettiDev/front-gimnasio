import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterModule]
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    // Suscribirse al observable de loggedIn para actualizar el estado dinámicamente
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout() {
    this.authService.logout(); // Ejecutar logout al hacer click
  }
}

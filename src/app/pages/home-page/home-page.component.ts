import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [ ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private authService: AuthService) { }

  testService() {
    const user = { id: 1, name: 'Juan' };

    // Guardar usuario
    this.authService.saveUser(user);
    console.log('Usuario guardado:', this.authService.getUser());

    // Comprobar si está logueado
    console.log('¿Está logueado?', this.authService.isLoggedIn());

    // Logout
    this.authService.logout();
    console.log('Después del logout:', this.authService.getUser());
    console.log('¿Está logueado?', this.authService.isLoggedIn());
  }
}

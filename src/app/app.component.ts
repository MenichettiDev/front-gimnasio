import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AuthService } from './service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { BarrasupComponent } from './shared/barrasup/barrasup.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SidebarComponent,
    BarrasupComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  selectedObjetivo: string = '';
  currentRoute: string = '';
  selectedFecha: string = '';
  selectedEstado: string = '';

  isLoggedIn: boolean = false; // Variable que guardará el estado de login
  private loggedInSubscription!: Subscription;  // Usamos '!' para decirle a TypeScript que esta propiedad será inicializada más tarde

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // Nos suscribimos al observable del servicio de autenticación para obtener el estado de login
    this.loggedInSubscription = this.authService.loggedIn$.subscribe(
      (loggedInStatus) => {
        this.isLoggedIn = loggedInStatus;
      }
    );
  }

  ngOnDestroy(): void {
    // Limpiamos la suscripción al destruir el componente
    if (this.loggedInSubscription) {
      this.loggedInSubscription.unsubscribe();
    }
  }

  // shouldShowSidebar(): boolean {
  //   const currentRoute = this.router.url;
  //   return !['login/login', 'login/home'].includes(currentRoute);
  // }
}

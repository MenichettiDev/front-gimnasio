import { Component, inject } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { AuthService } from './service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { BarrasupComponent } from "./shared/barrasup/barrasup.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent,
    CommonModule, BarrasupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  selectedObjetivo: string = '';
  currentRoute: string = '';
  selectedFecha: string = '';
  selectedEstado: string = '';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) { }

}

import { Component, inject } from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { AuthService } from './service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { BarrasupComponent } from "./shared/barrasup/barrasup.component";
import { CboEntrenadorComponent } from "./components/cbo-entrenador/cbo-entrenador.component";
import { CboAtletaComponent } from "./components/cbo-atleta/cbo-atleta.component";
import { CboDiasComponent } from "./components/cbo-dias/cbo-dias.component";
import { CboGruposmuscularesComponent } from "./components/cbo-gruposmusculares/cbo-gruposmusculares.component";
import { CboEjercicioComponent } from "./components/cbo-ejercicio/cbo-ejercicio.component";
import { RepeticionComponent } from "./components/repeticion/repeticion.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, CommonModule, BarrasupComponent, CboEntrenadorComponent, CboAtletaComponent, CboDiasComponent, CboGruposmuscularesComponent, CboEjercicioComponent, RepeticionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  currentRoute: string = '';

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService
  ) {}

}

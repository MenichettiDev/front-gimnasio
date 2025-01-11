import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { FrasesService } from '../../../service/frases.service';
import { Entrenador, EntrenadorService } from '../../../service/entrenador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-resumen',
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent {

  fraseAleatoria: string = "";
  entrenadores: Entrenador[] = [];

  constructor(private authService: AuthService, private frasesService: FrasesService, private entrenadoresService: EntrenadorService) { }

  // Se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.fraseAleatoria = this.frasesService.getFraseAleatoria();
    this.obtenerEntrenadores();
  }


  obtenerFraseAleatoria() {
    this.fraseAleatoria = this.frasesService.getFraseAleatoria();
  }

  // Llamada al servicio para obtener los entrenadores
  obtenerEntrenadores(): void {
    this.entrenadoresService.obtenerEntrenadores().subscribe(
      (data) => {
        this.entrenadores = data.entrenadores; // Asignas los datos a la variable del componente
        console.log('entrenadores: ', JSON.stringify(this.entrenadores))
      },
      (error) => {
        console.error('Error al obtener entrenadores', error);
      }
    );
  }
}

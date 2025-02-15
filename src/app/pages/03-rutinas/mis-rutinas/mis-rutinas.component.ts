import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CboAtletaComponent } from '../../../components/cbo-atleta/cbo-atleta.component';
import { RutinasService } from '../../../service/rutinas.service'; // Servicio para obtener datos
import { Atleta } from '../../../data/interfaces/atletaInterface'; // Modelo para el atleta
import { plan } from '../../../data/interfaces/rutinaArmadaInterface'; // Modelo para la rutina
import { AtletaService } from '../../../service/atleta.service';

@Component({
  selector: 'app-mis-rutinas',
  standalone: true,
  imports: [CommonModule, CboAtletaComponent],
  templateUrl: './mis-rutinas.component.html',
  styleUrls: ['./mis-rutinas.component.css']
})
export class MisRutinasComponent {
  idEntrenador: number = 1; // ID del entrenador actual (puedes obtenerlo desde una sesión o servicio)
  atletas: Atleta[] = []; // Lista de atletas del entrenador
  rutinas: plan[] = []; // Lista de rutinas del atleta seleccionado
  atletaSeleccionado: number | null = null; // ID del atleta seleccionado

  constructor(private rutinaService: RutinasService, private atletaService : AtletaService) {}

  ngOnInit(): void {
    // Obtener los atletas del entrenador al iniciar el componente
    this.atletaService.getAtletasPorEntrenador(this.idEntrenador).subscribe(
      ( response ) => {
        this.atletas = response.atletas;
      },
      (error) => {
        console.error('Error al cargar los atletas:', error);
      }
    );
  }

  // Método para manejar la selección de un atleta
  onAtletaSeleccionado(idAtleta: number): void {
    this.atletaSeleccionado = idAtleta;
  
    // Obtener las rutinas del atleta seleccionado
    if (this.atletaSeleccionado) {
      this.rutinaService.getRutinaByIdAtleta(this.atletaSeleccionado).subscribe(
        (response) => {
          this.rutinas = response; // Asigna las rutinas recibidas
        },
        (error) => {
          console.error('Error al cargar las rutinas:', error);
        }
      );
    }
  }
}
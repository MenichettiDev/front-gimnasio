import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RutinasService } from '../../service/rutinas.service';
import { Rutina } from '../../data/interfaces/rutinaInterface';

@Component({
  selector: 'app-cbo-rutina',
  standalone: true, // Opcional si usas Angular Standalone Components
  imports: [CommonModule, FormsModule],
  templateUrl: './cbo-rutina.component.html',
  styleUrls: ['./cbo-rutina.component.css'],
})
export class CboRutinaComponent implements OnInit {
  @Input() label: string = 'Seleccione una rutina'; // Etiqueta del combo
  @Input() id_atleta?: number; // ID del entrenador (opcional)
  @Input() id_creador?: number; // ID del creador (opcional)

  rutinas: Rutina[] = []; // Lista de rutinas
  selectedRutina: number | null = null; // Valor seleccionado

  constructor(private rutinaService: RutinasService) {}

  ngOnInit(): void {
    this.obtenerRutinas();
  }

  obtenerRutinas(): void {
    // Determinar qué método del servicio llamar según los parámetros
    if (this.id_atleta) {
      this.rutinaService.getRutinaByIdAtleta(this.id_atleta).subscribe(
        (data) => (this.rutinas = data),
        (error) => console.error('Error al obtener rutinas por atleta', error)
      );
    } else if (this.id_creador) {
      this.rutinaService.getRutinaByIdCreador(this.id_creador).subscribe(
        (data) => (this.rutinas = data),
        (error) => console.error('Error al obtener rutinas por creador', error)
      );
    } else {
      this.rutinaService.getRutinasFree().subscribe(
        (data) => (this.rutinas = data),
        (error) => console.error('Error al obtener rutinas libres', error)
      );
    }
  }
}

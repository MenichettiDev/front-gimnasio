import { Component, OnInit } from '@angular/core';// Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';  // Necesitamos importar NgFor para usarlo
import { FormsModule } from '@angular/forms';
import { Repeticion } from '../../data/interfaces/repeticionInterface';
import { RepeticionService } from '../../service/repeticion.service';


@Component({
  selector: 'app-repeticion',
  imports: [CommonModule, FormsModule],  // Importamos NgFor para usarlo en el template
  templateUrl: './repeticion.component.html',
  styleUrl: './repeticion.component.css'
})
export class RepeticionComponent {

  repeticiones: Repeticion[] = [];  // Lista de entrenadores
  selectedRepeticion: Repeticion | null = null;    // Para el valor seleccionado

  constructor(private repeticionService: RepeticionService) { }

  ngOnInit(): void {
    this.obtenerRepeticiones();
  }

  // Método para obtener los entrenadores
  obtenerRepeticiones(): void {
    this.repeticionService.getRepeticion().subscribe(
      (data) => {
        this.repeticiones = data;  // Asignamos los datos de los entrenadores
      },
      (error) => {
        console.error('Error al obtener entrenadores', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { EntrenadorService } from '../../service/entrenador.service'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';  // Necesitamos importar NgFor para usarlo
import { Entrenador } from '../../data/interfaces/entrenadorInterface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cbo-entrenador',
  imports: [CommonModule, FormsModule],  // Importamos NgFor para usarlo en el template
  templateUrl: './cbo-entrenador.component.html',
  styleUrl: './cbo-entrenador.component.css'
})
export class CboEntrenadorComponent implements OnInit {

  entrenadores: Entrenador[] = [];  // Lista de entrenadores
  selectedEntrenador: any;    // Para el valor seleccionado

  constructor(private entrenadorService: EntrenadorService) { }

  ngOnInit(): void {
    this.obtenerEntrenadores();
  }

  // Método para obtener los entrenadores
  obtenerEntrenadores(): void {
    this.entrenadorService.getEntrenadores().subscribe(
      (data) => {
        this.entrenadores = data.entrenadores;  // Asignamos los datos de los entrenadores
      },
      (error) => {
        console.error('Error al obtener entrenadores', error);
      }
    );
  }
}

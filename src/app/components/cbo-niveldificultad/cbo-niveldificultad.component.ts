import { Component } from '@angular/core';// Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';  // Necesitamos importar NgFor para usarlo
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cbo-niveldificultad',
  imports: [FormsModule, CommonModule],
  templateUrl: './cbo-niveldificultad.component.html',
  styleUrl: './cbo-niveldificultad.component.css'
})
export class CboNiveldificultadComponent {


  // Arreglo con datos hard de atletas
  dificultades = [
    { id_dificultad: 1, nombre: 'Principiante'},
    { id_dificultad: 2, nombre: 'Intermedio' },
    { id_dificultad: 3, nombre: 'Avanzado' }
  ];

  // Variable para almacenar el atleta seleccionado
  selectedDificultad: number | null = null;

  constructor() { }


}

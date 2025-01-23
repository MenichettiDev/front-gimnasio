import { Component, Input } from '@angular/core';// Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';  // Necesitamos importar NgFor para usarlo
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cbo-objetivo',
  imports: [FormsModule, CommonModule],
  templateUrl: './cbo-objetivo.component.html',
  styleUrl: './cbo-objetivo.component.css'
})
export class CboObjetivoComponent {

@Input() label: string = "Selecciona el objetivo";  // Para el label del combo
  // Arreglo con datos hard de atletas
  objetivos = [
    { id_objetivos: 1, nombre: 'Ganar masa muscular'},
    { id_objetivos: 2, nombre: 'Tonificar' },
    { id_objetivos: 3, nombre: 'Bajar de peso' },
    { id_objetivos: 3, nombre: 'Resistencia' },
  ];

  // Variable para almacenar el atleta seleccionado
  selectedObjetivo: number | null = null;

  constructor() { }


}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cbo-dias',
  imports: [ FormsModule, CommonModule],
  templateUrl: './cbo-dias.component.html',
  styleUrl: './cbo-dias.component.css'
})
export class CboDiasComponent {
  diasDeEntrenamiento = [1, 2, 3, 4, 5, 6, 7];  // Número de días de entrenamiento

  diasSeleccionados: number = 3; // Variable que guarda la cantidad seleccionada
}

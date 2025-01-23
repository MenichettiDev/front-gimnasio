import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-input-fecha',
  imports: [FormsModule, CommonModule],
  templateUrl: './input-fecha.component.html',
  styleUrl: './input-fecha.component.css'
})
export class InputFechaComponent {
  @Input() label: string = ''; // Recibe un texto para el label
  @Input() placeholder: string = ''; // Placeholder para el input (aunque no se usa en 'date' normalmente)
  @Input() value: string = ''; // Recibe el valor inicial del input (formato: YYYY-MM-DD)

  // El evento de salida para enviar el valor de vuelta al componente padre
  @Output() valueChange = new EventEmitter<string>();

  onValueChange() {
    // Emitir el valor cada vez que se cambie
    this.valueChange.emit(this.value);
  }
}

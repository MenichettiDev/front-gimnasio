import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-txt-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './txt-input.component.html',
  styleUrl: './txt-input.component.css'
})
export class TxtInputComponent {
  @Input() label: string = ''; // Recibe un texto para el label
  @Input() placeholder: string = ''; // Recibe un placeholder para el input
  @Input() value: string = ''; // Recibe el valor inicial del input

  // El evento de salida para enviar el valor de vuelta al componente padre
  @Output() valueChange = new EventEmitter<string>();

  onValueChange() {
    // Emitir el valor cada vez que se cambie
    this.valueChange.emit(this.value);
  }
}

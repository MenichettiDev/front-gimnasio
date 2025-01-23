import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-rb-estado',
  imports: [FormsModule, CommonModule],
  templateUrl: './rb-estado.component.html',
  styleUrl: './rb-estado.component.css'
})
export class RbEstadoComponent {

  @Input() label: string = ''; // Etiqueta para el grupo de radio buttons
  @Input() options: string[] = []; // Lista de opciones para los radio buttons
  @Input() name: string = 'radioGroup'; // Nombre del grupo de radio buttons
  @Input() value: string = ''; // Valor inicial del radio button seleccionado

  // Evento de salida para emitir el valor seleccionado
  @Output() valueChange = new EventEmitter<string>();

  onValueChange() {
    // Emitir el valor seleccionado al componente padre
    this.valueChange.emit(this.value);
  }
}

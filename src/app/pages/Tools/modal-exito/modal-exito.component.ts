import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-exito',
  imports: [],
  templateUrl: './modal-exito.component.html',
  styleUrl: './modal-exito.component.css'
})
export class ModalExitoComponent {
  @Input() mensajeExito: string = 'Operación realizada con éxito.';
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}

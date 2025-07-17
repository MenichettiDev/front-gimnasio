import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  imports: [],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.css'
})
export class ModalErrorComponent {
  @Input() mensajeError: string = 'Ha ocurrido un error inesperado.';
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}

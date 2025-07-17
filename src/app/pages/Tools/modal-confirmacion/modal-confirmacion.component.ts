import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal-confirmacion',
  imports: [NgClass],
  templateUrl: './modal-confirmacion.component.html',
  styleUrl: './modal-confirmacion.component.css'
})
export class ModalConfirmacionComponent {
  @Input() mensaje: string = '¿Está seguro que desea continuar?';
  confirmando: boolean = false;
  resultado: 'exito' | 'error' | null = null;
  mensajeResultado: string = '';

  confirmar() {
    this.confirmando = true;
    // Simulación de resultado, reemplazar con lógica real
    setTimeout(() => {
      const exito = Math.random() > 0.5;
      this.resultado = exito ? 'exito' : 'error';
      this.mensajeResultado = exito
        ? 'Operación realizada con éxito.'
        : 'Ocurrió un error al realizar la operación.';
      this.confirmando = false;
    }, 1200);
  }

  cancelar() {
    this.resultado = null;
    this.mensajeResultado = '';
    // Aquí podrías emitir un evento para cerrar el modal
  }

  cerrarResultado() {
    this.resultado = null;
    this.mensajeResultado = '';
    // Aquí podrías emitir un evento para cerrar el modal
  }
}

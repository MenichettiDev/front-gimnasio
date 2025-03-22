import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css'],
  animations: [
    trigger('modalAnimation', [
      // Estado inicial (invisible y fuera de la pantalla)
      state('void', style({
        opacity: 0,
        transform: 'scale(0.8) translateY(-50px)' // Escala reducida y desplazamiento hacia arriba
      })),
      // Estado final (visible y centrado)
      state('*', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)' // Escala normal y sin desplazamiento
      })),
      // Transición de entrada (aparece)
      transition(':enter', [
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)')
      ]),
      // Transición de salida (desaparece)
      transition(':leave', [
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          opacity: 0,
          transform: 'scale(0.8) translateY(-50px)'
        }))
      ])
    ])
  ]
})
export class ModalConfirmComponent {
  @Input() visible: boolean = false; // Controla la visibilidad del modal
  @Input() title: string = 'Confirmación'; // Título del modal
  @Input() message: string = '¿Estás seguro de realizar esta acción?'; // Mensaje del modal

  @Output() confirm = new EventEmitter<void>(); // Evento cuando se confirma
  @Output() cancel = new EventEmitter<void>(); // Evento cuando se cancela

  // Método para manejar la confirmación
  onConfirm() {
    this.confirm.emit(); // Emite el evento de confirmación
  }

  // Método para manejar la cancelación
  onCancel() {
    this.cancel.emit(); // Emite el evento de cancelación
  }
}

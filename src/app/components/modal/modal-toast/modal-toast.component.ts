import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-modal-toast',
  standalone: true,  // Marcamos como standalone si es el caso
  imports: [CommonModule],  // Importa CommonModule para usar ngIf, ngClass, etc.
  templateUrl: './modal-toast.component.html',
  styleUrls: ['./modal-toast.component.css']
})
export class ModalToastComponent implements OnChanges {
  @Input() message: string = ''; // El mensaje de la notificación
  @Input() isVisible: boolean = false; // Controla la visibilidad del toast
  @Input() type: string = 'success'; // Tipo de notificación ('success' o 'error')

  toastClass: string = ''; // Clase dinámica para cambiar el estilo del toast

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isVisible) {
      this.setToastClass();
      // Si quieres ocultarlo después de un tiempo, por ejemplo, 3 segundos:
      setTimeout(() => {
        this.isVisible = false;
      }, 3000); // 3 segundos
    }
  }

  setToastClass(): void {
    this.toastClass = this.type === 'success' ? 'toast-success' : 'toast-error';
  }

}

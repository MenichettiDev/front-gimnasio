import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]

@Component({
  selector: 'app-medida-form',
  standalone: true,
  imports: [FormsModule], // Importa FormsModule para [(ngModel)]
  templateUrl: './medida-form.component.html',
  styleUrls: ['./medida-form.component.css'],
})
export class MedidaFormComponent {
  @Input() medidaSeleccionada: any = null; // Datos iniciales para edición
  @Output() guardar = new EventEmitter<any>(); // Evento para guardar
  @Output() cancelar = new EventEmitter<void>(); // Evento para cancelar

  medidaForm: any = {}; // Modelo del formulario

  ngOnInit(): void {
    if (this.medidaSeleccionada) {
      this.medidaForm = { ...this.medidaSeleccionada }; // Prellenar el formulario
    } else {
      this.limpiarFormulario(); // Inicializar con valores predeterminados
    }
  }

  onSubmit(): void {
    this.guardar.emit(this.medidaForm); // Emitir datos al padre
  }

  onCancel(): void {
    this.cancelar.emit(); // Notificar cancelación
  }

  limpiarFormulario(): void {
    this.medidaForm = {
      fecha_medicion: '',
      peso: 0,
      altura: 0,
      biceps: 0,
      pecho: 0,
      hombros: 0,
      cintura: 0,
      gluteos: 0,
      cuadriceps: 0,
      gemelos: 0,
      antebrazo: 0,
      cuello: 0,
      grasa_corporal: 0,
    };
  }
}

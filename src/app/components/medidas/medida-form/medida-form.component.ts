import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Medida {
  id?: number;
  fecha_medicion: string;
  peso: number;
  altura: number;
  biceps: number;
  pecho: number;
  hombros: number;
  cintura: number;
  gluteos: number;
  cuadriceps: number;
  gemelos: number;
  antebrazo: number;
  cuello: number;
  grasa_corporal: number;
}
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

  medidaForm: Medida = this.getFormInicial();

  ngOnInit(): void {
    if (this.medidaSeleccionada) {
      this.medidaForm = { ...this.medidaSeleccionada }; // Prellenar el formulario
    } else {
      this.limpiarFormulario(); // Inicializar con valores predeterminados
    }
  }

  onSubmit(): void {
    if (this.validarFormulario()) {
      this.guardar.emit(this.medidaForm);
    }
  }

  private validarFormulario(): boolean {
    return this.medidaForm.peso > 0 &&
      this.medidaForm.altura > 0 &&
      this.medidaForm.fecha_medicion !== '';
  }

  private getFormInicial(): Medida {
    return {
      fecha_medicion: new Date().toISOString().split('T')[0],
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

import { Component, OnInit } from '@angular/core';
import { RepeticionService } from '../../../service/repeticion.service'; // Ajusta la ruta según tu estructura
import { Repeticion } from '../../../data/interfaces/repeticionInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repeticion',
  imports: [ CommonModule, FormsModule],
  templateUrl: './repeticion.component.html',
  styleUrl: './repeticion.component.css'
})
export class RepeticionComponent  implements OnInit {
  repeticiones: Repeticion[] = [];
  nuevaRepeticion: Repeticion = {
    id_repeticion: 0,
    nombre: '',
    frecuencia: '',
    comentario: ''
  };
  modoEdicion = false;
  repeticionSeleccionada: Repeticion | null = null;

  constructor(private repeticionService: RepeticionService) {}

  ngOnInit(): void {
    this.cargarRepeticiones();
  }

  // Cargar todas las repeticiones
  cargarRepeticiones(): void {
    this.repeticionService.getRepeticion().subscribe(
      (data: Repeticion[]) => {
        this.repeticiones = data;
      },
      (error) => {
        console.error('Error al cargar las repeticiones:', error);
      }
    );
  }

  // Crear una nueva repetición
  crearRepeticion(): void {
    this.repeticionService
      .crearRepeticion(this.nuevaRepeticion.nombre, this.nuevaRepeticion.frecuencia, this.nuevaRepeticion.comentario)
      .subscribe(
        () => {
          this.cargarRepeticiones(); // Refrescar la lista
          this.resetFormulario();
        },
        (error) => {
          console.error('Error al crear la repetición:', error);
        }
      );
  }

  // Editar una repetición existente
  editarRepeticion(repeticion: Repeticion): void {
    this.modoEdicion = true;
    this.repeticionSeleccionada = { ...repeticion };
    this.nuevaRepeticion = { ...repeticion };
  }

  // Guardar cambios en una repetición
  guardarCambios(): void {
    if (this.repeticionSeleccionada && this.repeticionSeleccionada.id_repeticion) {
      this.repeticionService
        .actualizarRepeticion(
          this.repeticionSeleccionada.id_repeticion,
          this.nuevaRepeticion.nombre,
          this.nuevaRepeticion.frecuencia,
          this.nuevaRepeticion.comentario
        )
        .subscribe(
          () => {
            this.cargarRepeticiones(); // Refrescar la lista
            this.resetFormulario();
          },
          (error) => {
            console.error('Error al actualizar la repetición:', error);
          }
        );
    }
  }

  // Eliminar una repetición
  eliminarRepeticion(id: number): void {
    this.repeticionService.eliminarRepeticion(id).subscribe(
      () => {
        this.cargarRepeticiones(); // Refrescar la lista
      },
      (error) => {
        console.error('Error al eliminar la repetición:', error);
      }
    );
  }

  // Resetear el formulario
  resetFormulario(): void {
    this.nuevaRepeticion = {
      id_repeticion: 0,
      nombre: '',
      frecuencia: '',
      comentario: ''
    };
    this.modoEdicion = false;
    this.repeticionSeleccionada = null;
  }
}

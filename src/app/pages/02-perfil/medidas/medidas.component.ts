import { Component, OnInit } from '@angular/core';
import { MedidasService } from '../../../service/medidas.service'; // Servicio de medidas
import { AuthService } from '../../../service/auth/auth.service'; // Servicio de autenticación
import { Medida } from '../../../data/interfaces/tbMedidaInterface'; // Interfaz de medidas
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class MedidasComponent implements OnInit {
  medidas: Medida[] = []; // Lista de medidas del atleta
  medidaSeleccionada: Medida | null = null; // Medida seleccionada para editar
  idAtleta: number | null = null; // ID del atleta autenticado
  medidaForm: any = {}; // Propiedad intermedia para el formulario

  // Variables para el formulario de creación/edición
  nuevaMedida = {
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

  constructor(
    private medidaService: MedidasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del atleta autenticado
    this.idAtleta = this.authService.getUser()[0].id_persona;
    console.log( this.idAtleta)
    if (this.idAtleta) {
      this.cargarMedidas(); // Cargar las medidas del atleta
      this.limpiarFormulario(); // Inicializar medidaForm con valores predeterminados
    }
  }

  // Cargar las medidas del atleta
  cargarMedidas(): void {
    if (this.idAtleta) {
      this.medidaService.getMedidasByAtleta(this.idAtleta).subscribe(
        (data: Medida[]) => {
          this.medidas = data;
        },
        (error) => {
          console.error('Error al cargar las medidas:', error);
        }
      );
    }
  }

  // Seleccionar una medida para editar
  seleccionarMedida(medida: Medida): void {
    this.medidaSeleccionada = { ...medida };
    this.medidaForm = { ...this.medidaSeleccionada }; // Actualizar medidaForm con la medida seleccionada
  }

  // Crear una nueva medida
  crearMedida(): void {
    if (this.idAtleta) {
      this.medidaService
        .crearMedida(
          this.idAtleta,
          this.medidaForm.fecha_medicion,
          this.medidaForm.peso,
          this.medidaForm.altura,
          this.medidaForm.biceps,
          this.medidaForm.pecho,
          this.medidaForm.hombros,
          this.medidaForm.cintura,
          this.medidaForm.gluteos,
          this.medidaForm.cuadriceps,
          this.medidaForm.gemelos,
          this.medidaForm.antebrazo,
          this.medidaForm.cuello,
          this.medidaForm.grasa_corporal
        )
        .subscribe(
          () => {
            this.cargarMedidas(); // Recargar la lista de medidas
            this.limpiarFormulario(); // Limpiar el formulario
          },
          (error) => {
            console.error('Error al crear la medida:', error);
          }
        );
    }
  }

  // Actualizar una medida existente
  actualizarMedida(): void {
    if (this.medidaSeleccionada && this.idAtleta) {
      this.medidaService
        .actualizarMedida(
          this.medidaSeleccionada.id_medida,
          this.idAtleta,
          this.medidaForm.fecha_medicion,
          this.medidaForm.peso,
          this.medidaForm.altura,
          this.medidaForm.biceps,
          this.medidaForm.pecho,
          this.medidaForm.hombros,
          this.medidaForm.cintura,
          this.medidaForm.gluteos,
          this.medidaForm.cuadriceps,
          this.medidaForm.gemelos,
          this.medidaForm.antebrazo,
          this.medidaForm.cuello,
          this.medidaForm.grasa_corporal
        )
        .subscribe(
          () => {
            this.cargarMedidas(); // Recargar la lista de medidas
            this.medidaSeleccionada = null; // Limpiar la medida seleccionada
            this.limpiarFormulario(); // Reiniciar el formulario
          },
          (error) => {
            console.error('Error al actualizar la medida:', error);
          }
        );
    }
  }

  // Eliminar una medida
  eliminarMedida(id: number): void {
    this.medidaService.eliminarMedida(id).subscribe(
      () => {
        this.cargarMedidas(); // Recargar la lista de medidas
      },
      (error) => {
        console.error('Error al eliminar la medida:', error);
      }
    );
  }

  // Limpiar el formulario de creación
  limpiarFormulario(): void {
    this.nuevaMedida = {
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
    this.medidaForm = { ...this.nuevaMedida }; // Reiniciar medidaForm con los valores predeterminados
  }
}
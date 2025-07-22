import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MedidasService } from '../../../service/medidas.service';
import { AuthService } from '../../../service/auth/auth.service';
import { Medida } from '../../../data/interfaces/tbMedidaInterface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-medidas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.css'],
})
export class MedidasComponent implements OnInit {
  medidaSeleccionada: Medida | null = null; // Medida  para edición
  medidaForm: any = {
    fecha_medicion: '',
    peso: null,
    altura: null,
    biceps: null,
    pecho: null,
    hombros: null,
    cintura: null,
    gluteos: null,
    cuadriceps: null,
    gemelos: null,
    antebrazo: null,
    cuello: null,
    grasa_corporal: null
  };

  idAtleta: number | null = null;

  constructor(
    private medidaService: MedidasService,
    private authService: AuthService,
    private router: Router // <--- Agrega esto

  ) {
    const navigation = this.router.getCurrentNavigation();
    this.medidaSeleccionada = navigation?.extras.state?.['medida'] || null;
  }

  ngOnInit(): void {
    this.idAtleta = this.authService.getIdAtleta();
    if (this.medidaSeleccionada) {
      // Edición: inicializar el formulario con los valores de la medida
      console.log('Medida seleccionada para edición:', this.medidaSeleccionada);
      this.medidaForm = { ...this.medidaSeleccionada };
    }
    // Convertir fecha_medicion a formato YYYY-MM-DD si existe
    if (this.medidaForm.fecha_medicion) {
      this.medidaForm.fecha_medicion = this.medidaForm.fecha_medicion.substring(0, 10);
    }
  }

  onSubmit(): void {
    if (!this.idAtleta) return;

    if (this.medidaSeleccionada) {
      // Actualizar medida existente
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
          () => this.onCancel(),
          (error) => console.error('Error al actualizar la medida:', error)
        );
    } else {
      // Crear nueva medida
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
          () => this.onCancel(),
          (error) => console.error('Error al crear la medida:', error)
        );
    }
  }

  onCancel(): void {
    // Limpia el formulario y/o cierra el modal según tu lógica de UI
    this.medidaForm = {
      fecha_medicion: '',
      peso: null,
      altura: null,
      biceps: null,
      pecho: null,
      hombros: null,
      cintura: null,
      gluteos: null,
      cuadriceps: null,
      gemelos: null,
      antebrazo: null,
      cuello: null,
      grasa_corporal: null
    };
    this.medidaSeleccionada = null;
    // Aquí podrías emitir un evento o cerrar el modal si corresponde
  }
}
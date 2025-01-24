import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SharedGrupoMuscularService } from '../../service/shared-grupo-muscular.service';
import { GrupoMuscular } from '../../data/interfaces/grupoMuscularInterface';
import { EjerciciosService } from '../../service/ejercicios.service';
import { Ejercicio } from '../../data/interfaces/ejercicioInterface';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cbo-ejercicio',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cbo-ejercicio.component.html',
  styleUrl: './cbo-ejercicio.component.css',
})
export class CboEjercicioComponent implements OnInit {
  @Input() label: string = 'Selecciona un Ejercicio'; // Label opcional
  @Input() grupoMuscularId: number | null = null; // ID del grupo muscular recibido del padre

  @Output() valueChange: EventEmitter<Ejercicio> = new EventEmitter<Ejercicio>(); // Evento para emitir el ejercicio seleccionado

  ejercicios: Ejercicio[] = []; // Lista de ejercicios
  selectedEjercicio: Ejercicio | null = null; // Ejercicio seleccionado
  exerciseForm: FormGroup; // Formulario reactivo

  constructor(private ejercicioService: EjerciciosService) {
    this.exerciseForm = new FormGroup({
      id_ejercicio: new FormControl(null),
      nombre: new FormControl(null),
      id_grupo_muscular: new FormControl(null),
      descripcion: new FormControl(null),
      img_1: new FormControl(null),
      img_2: new FormControl(null),
      img_3: new FormControl(null),
      link_video: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.cargarEjerciciosPorGrupo();
  }

  ngOnChanges(): void {
    this.cargarEjerciciosPorGrupo();
  }

  cargarEjerciciosPorGrupo(): void {
    if (this.grupoMuscularId) {
      this.ejercicioService.getEjercicioPorGrupoMuscular(this.grupoMuscularId).subscribe(
        (data) => {
          this.ejercicios = data;
        },
        (error) => {
          console.error('Error al obtener ejercicios', error);
        }
      );
    }
  }

  onEjercicioChange(ejercicio: Ejercicio): void {
    if (ejercicio) {
      this.selectedEjercicio = ejercicio;
      this.valueChange.emit(ejercicio); // Emitir el ejercicio seleccionado al componente padre
      this.exerciseForm.patchValue(ejercicio); // Cargar datos del ejercicio en el formulario
      this.exerciseForm.enable(); // Habilitar formulario si está deshabilitado
    }
  }
}

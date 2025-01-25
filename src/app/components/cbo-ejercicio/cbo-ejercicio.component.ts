import { Component, Input, Output, EventEmitter, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedGrupoMuscularService } from '../../service/shared-grupo-muscular.service';
import { EjerciciosService } from '../../service/ejercicios.service';
import { Ejercicio } from '../../data/interfaces/ejercicioInterface';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cbo-ejercicio',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cbo-ejercicio.component.html',
  styleUrls: ['./cbo-ejercicio.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboEjercicioComponent),
      multi: true
    }
  ]
})
export class CboEjercicioComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = 'Selecciona un Ejercicio'; // Label opcional
  @Input() grupoMuscularId: number | null = null; // ID del grupo muscular recibido del padre

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>(); // Emitir solo el ID del ejercicio

  ejercicios: Ejercicio[] = []; // Lista de ejercicios
  selectedEjercicio: Ejercicio | null = null; // Ejercicio seleccionado
  exerciseForm: FormGroup; // Formulario reactivo

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

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
      this.onChange(ejercicio.id_ejercicio); // Emitir solo el id del ejercicio
      this.valueChange.emit(ejercicio.id_ejercicio); // Emitir el id del ejercicio
      this.exerciseForm.patchValue(ejercicio); // Cargar datos del ejercicio en el formulario
      this.exerciseForm.enable(); // Habilitar formulario si está deshabilitado
    }
  }

  // Métodos de ControlValueAccessor
  writeValue(value: number): void {
    this.selectedEjercicio = this.ejercicios.find(e => e.id_ejercicio === value) || null;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Aquí puedes manejar el estado deshabilitado si es necesario
  }
}
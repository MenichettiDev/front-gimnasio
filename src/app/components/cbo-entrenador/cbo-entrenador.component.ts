import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EntrenadorService } from '../../service/entrenador.service';
import { Entrenador } from '../../data/interfaces/entrenadorInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cbo-entrenador',
  templateUrl: './cbo-entrenador.component.html',
  styleUrls: ['./cbo-entrenador.component.css'],
  imports:[ CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboEntrenadorComponent),
      multi: true,
    },
  ],
})
export class CboEntrenadorComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = "Selecciona un Entrenador"; // Para el label del combo
  entrenadores: Entrenador[] = []; // Lista de entrenadores
  selectedEntrenador: number = 0; // Valor seleccionado (id_entrenador)
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private entrenadorService: EntrenadorService) {}

  ngOnInit(): void {
    this.obtenerEntrenadores();
  }

  // Método para obtener los entrenadores
  obtenerEntrenadores(): void {
    this.entrenadorService.getEntrenadores().subscribe(
      (data) => {
        this.entrenadores = data.entrenadores; // Asignamos los datos de los entrenadores
      },
      (error) => {
        console.error('Error al obtener entrenadores', error);
      }
    );
  }

  // Maneja cambios en el select
  onValueChange(): void {
    this.onChange(this.selectedEntrenador); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  // Métodos de ControlValueAccessor
  writeValue(value: number): void {
    this.selectedEntrenador = value ; // Actualiza el valor interno
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled; // Habilita/deshabilita el control
  }
}
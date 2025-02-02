import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-cbo-niveldificultad',
  templateUrl: './cbo-niveldificultad.component.html',
  styleUrls: ['./cbo-niveldificultad.component.css'],
  imports:[ CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboNiveldificultadComponent),
      multi: true,
    },
  ],
})
export class CboNiveldificultadComponent implements ControlValueAccessor {
  @Input() label: string = "Selecciona el nivel del atleta"; // Para el label del combo

  // Arreglo con datos hard de dificultades
  dificultades = [
    { id_dificultad: 1, nombre: 'Principiante' },
    { id_dificultad: 2, nombre: 'Intermedio' },
    { id_dificultad: 3, nombre: 'Avanzado' }
  ];

  selectedDificultad: number = 1; // Valor seleccionado (id_dificultad)
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  // Maneja cambios en el select
  onValueChange(): void {
    this.onChange(this.selectedDificultad); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  // Métodos de ControlValueAccessor
  writeValue(value: number): void {
    this.selectedDificultad = value ; // Actualiza el valor interno
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
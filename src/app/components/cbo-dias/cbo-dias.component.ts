import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-cbo-dias',
  templateUrl: './cbo-dias.component.html',
  styleUrls: ['./cbo-dias.component.css'],
  imports:[ CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboDiasComponent),
      multi: true,
    },
  ],
})
export class CboDiasComponent implements ControlValueAccessor {
  @Input() label: string = "Selecciona la cantidad de días a entrenar"; // Para el label del combo
  diasDeEntrenamiento = [1, 2, 3, 4, 5, 6, 7]; // Número de días de entrenamiento
  diasSeleccionados: number | null = null; // Valor seleccionado (número de días)
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  onChange: any = () => {};
  onTouched: any = () => {};

  // Implementación de ControlValueAccessor
  writeValue(value: any): void {
    this.diasSeleccionados = value || null; // Actualiza el valor interno
  }

  registerOnChange(fn: any): void {
    this.onChange = fn; // Registra la función de cambio
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn; // Registra la función de "tocado"
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled; // Habilita/deshabilita el control
  }

  // Maneja cambios en el select
  onValueChange(): void {
    this.onChange(this.diasSeleccionados); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }
}
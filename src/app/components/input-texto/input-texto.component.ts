import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-texto',
  templateUrl: './input-texto.component.html',
  styleUrls: ['./input-texto.component.css'],
  imports: [ CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextoComponent),
      multi: true,
    },
  ],
})
export class InputTextoComponent implements ControlValueAccessor {
  @Input() label: string = ''; // Recibe un texto para el label
  @Input() placeholder: string = ''; // Recibe un placeholder para el input

  value: string = ''; // Valor interno del input
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  onChange: any = () => {};
  onTouched: any = () => {};

  // Implementación de ControlValueAccessor
  writeValue(value: any): void {
    this.value = value || ''; // Actualiza el valor interno
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

  // Maneja cambios en el input
  onValueChange(): void {
    this.onChange(this.value); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }
}
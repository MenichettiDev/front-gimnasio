import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-input-fecha',
  templateUrl: './input-fecha.component.html',
  standalone: true,
  styleUrls: ['./input-fecha.component.css'],
  imports: [DatePickerModule, CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFechaComponent),
      multi: true,
    },
  ],
})
export class InputFechaComponent implements ControlValueAccessor {
  @Input() label: string = 'Selecciona una fecha'; // Etiqueta del campo
  value: Date | null = null; // Valor interno del componente
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: Date | null) => void = () => {};
  private onTouched: () => void = () => {};

  // Maneja cambios en el calendario
  onValueChange(event: Date | null): void {
    this.value = event; // Actualiza el valor interno
    this.onChange(this.value); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  // Métodos de ControlValueAccessor
  writeValue(value: Date | null): void {
    this.value = value || null; // Actualiza el valor interno
  }

  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled; // Habilita/deshabilita el control
  }
}

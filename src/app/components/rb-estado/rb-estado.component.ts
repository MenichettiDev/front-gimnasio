import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rb-estado',
  templateUrl: './rb-estado.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  styleUrls: ['./rb-estado.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RbEstadoComponent),
      multi: true,
    },
  ],
})
export class RbEstadoComponent implements ControlValueAccessor {
  @Input() label: string = ''; // Etiqueta para el grupo de radio buttons
  @Input() options: string[] = []; // Lista de opciones para los radio buttons
  @Input() name: string = 'radioGroup'; // Nombre del grupo de radio buttons
  value: string = ''; // Valor seleccionado
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Maneja cambios en los radio buttons
  onValueChange(): void {
    this.onChange(this.value); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  // Métodos de ControlValueAccessor
  writeValue(value: string): void {
    this.value = value || ''; // Actualiza el valor interno
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled; // Habilita/deshabilita el control
  }
}
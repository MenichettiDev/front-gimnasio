import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-cbo-objetivo',
  templateUrl: './cbo-objetivo.component.html',
  styleUrls: ['./cbo-objetivo.component.css'],
  imports: [ FormsModule, CommonModule ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboObjetivoComponent),
      multi: true,
    },
  ],
})
export class CboObjetivoComponent implements ControlValueAccessor {
  @Input() label: string = "Selecciona el objetivo"; // Para el label del combo

  // Arreglo con datos hard de objetivos
  objetivos = [
    { id_objetivos: 1, nombre: 'Ganar masa muscular' },
    { id_objetivos: 2, nombre: 'Tonificar' },
    { id_objetivos: 3, nombre: 'Bajar de peso' },
    { id_objetivos: 4, nombre: 'Resistencia' }, // Corregido el ID duplicado
  ];

  selectedObjetivo: number  = 1; // Valor seleccionado (id_objetivos)
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  // Maneja cambios en el select
  onValueChange(): void {
    this.onChange(this.selectedObjetivo); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  // Métodos de ControlValueAccessor
  writeValue(value: number): void {
    this.selectedObjetivo = value ; // Actualiza el valor interno
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
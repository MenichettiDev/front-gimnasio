import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-cbo-perfil',
  templateUrl: './cbo-perfil.component.html',
  styleUrls: ['./cbo-perfil.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboPerfilComponent),
      multi: true,
    },
  ],
})
export class CboPerfilComponent implements ControlValueAccessor {
  @Input() label: string = "Selecciona el perfil"; // Para el label del combo

  // Arreglo con datos hard de perfiles
  perfiles = [
    { id_perfil: 1, nombre: 'Admin' },
    { id_perfil: 2, nombre: 'Entrenador' },
    { id_perfil: 3, nombre: 'Atleta' },
    { id_perfil: 4, nombre: 'Visita' }, // Corregido el ID duplicado
  ];

  selectedPerfil: any | null = null; // Valor seleccionado (objeto perfil)
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // Maneja cambios en el select
  onValueChange(): void {
    this.onChange(this.selectedPerfil); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  // Métodos de ControlValueAccessor
  writeValue(value: any): void {
    this.selectedPerfil = value || null; // Actualiza el valor interno
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled; // Habilita/deshabilita el control
  }
}
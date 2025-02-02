import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RepeticionService } from '../../service/repeticion.service';
import { Repeticion } from '../../data/interfaces/repeticionInterface';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-cbo-repeticiones',
  templateUrl: './cbo-repeticiones.component.html',
  styleUrls: ['./cbo-repeticiones.component.css'],
  imports: [FormsModule, CommonModule, DropdownModule ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboRepeticionesComponent),
      multi: true,
    },
  ],
})
export class CboRepeticionesComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = "Selecciona un tipo de repetición"; // Para el label del combo

  repeticiones: Repeticion[] = []; // Lista de repeticiones
  selectedRepeticion: Repeticion | null = null; // Valor seleccionado (objeto repeticion)
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private repeticionService: RepeticionService) {}

  ngOnInit(): void {
    this.obtenerRepeticiones();
  }

  // Método para obtener las repeticiones
  obtenerRepeticiones(): void {
    this.repeticionService.getRepeticion().subscribe(
      (data) => {
        this.repeticiones = data; // Asignamos los datos de las repeticiones
      },
      (error) => {
        console.error('Error al obtener repeticiones', error);
      }
    );
  }

  // Maneja cambios en el dropdown
  onValueChange(): void {
    this.onChange(this.selectedRepeticion); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  // Métodos de ControlValueAccessor
  writeValue(value: any): void {
    this.selectedRepeticion = value || null; // Actualiza el valor interno
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
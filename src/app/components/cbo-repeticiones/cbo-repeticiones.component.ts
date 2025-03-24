import { Component, Input, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RepeticionService } from '../../service/repeticion.service';
import { Repeticion } from '../../data/interfaces/repeticionInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cbo-repeticiones',
  templateUrl: './cbo-repeticiones.component.html',
  styleUrls: ['./cbo-repeticiones.component.css'],
  imports: [FormsModule, CommonModule],
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
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  repeticiones: Repeticion[] = []; // Lista de repeticiones
  selectedRepeticion: Repeticion | null = null; // Valor seleccionado (objeto repeticion)
  isDisabled: boolean = false; // Estado de deshabilitado
  private datosCargados = false; // Flag para indicar si los datos están cargados

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
        this.datosCargados = true; // Marcar que los datos están cargados
      },
      (error) => {
        console.error('Error al obtener repeticiones', error);
      }
    );
  }

  // Maneja cambios en el select
onValueChange(): void {
  const idRepeticion = this.selectedRepeticion?.id_repeticion || undefined; // Obtiene el ID de la repetición
  this.valueChange.emit(idRepeticion); // Emite el ID al padre
  this.onChange(idRepeticion); // Notifica a Angular sobre el cambio
  this.onTouched(); // Marca el control como "tocado"
}

  // Métodos de ControlValueAccessor
  writeValue(value: number): void {
    if (this.datosCargados) {
      // Buscar la repetición correspondiente al valor recibido
      const repeticionEncontrada = this.repeticiones.find(r => r.id_repeticion === value);
      this.selectedRepeticion = repeticionEncontrada || null;
    } else {
      // Si los datos aún no están cargados, reintenta después de 100 ms
      setTimeout(() => {
        this.writeValue(value);
      }, 100);
    }
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
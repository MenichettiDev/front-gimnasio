import { Component, Input, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GimnasioService } from '../../../service/gimnasio.service';
import { Gimnasio } from '../../../data/interfaces/gimnasioInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cbo-gimnasios-multiples',
  templateUrl: './cbo-gimnasios-multiples.component.html',
  styleUrls: ['./cbo-gimnasios-multiples.component.css'],
  imports: [ CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboGimnasiosMultiplesComponent),
      multi: true,
    },
  ],
})
export class CboGimnasiosMultiplesComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = 'Selecciona Gimnasios'; // Etiqueta del combo
  @Input() emitOnlyIds: boolean = false; // Controla si se emiten solo los IDs o los objetos completos
  @Output() valueChange = new EventEmitter<number[]>();
  gimnasios: Gimnasio[] = []; // Lista de gimnasios
  selectedGimnasios: number[] = []; // Valores seleccionados (IDs de los gimnasios)
  isDisabled: boolean = false; // Estado deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private gimnasioService: GimnasioService) {}

  ngOnInit(): void {
    this.obtenerGimnasios();
  }

  // Método para obtener los gimnasios
  obtenerGimnasios(): void {
    this.gimnasioService.getGimnasios().subscribe(
      (data) => {
        this.gimnasios = data; // Asignamos los datos de los gimnasios
      },
      (error) => {
        console.error('Error al obtener gimnasios', error);
      }
    );
  }

  // Maneja cambios en la selección
  onValueChange(): void {
    const valueToEmit = this.emitOnlyIds
      ? this.selectedGimnasios // Emite solo los IDs si emitOnlyIds es true
      : this.gimnasios.filter((g) => this.selectedGimnasios.includes(g.id_gimnasio)); // Emite los objetos completos si emitOnlyIds es false

    this.onChange(valueToEmit); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
    this.valueChange.emit(this.selectedGimnasios); // Emite el evento
  }

  // Métodos de ControlValueAccessor
  writeValue(value: any): void {
    if (this.emitOnlyIds) {
      this.selectedGimnasios = value || []; // Asigna directamente los IDs
    } else {
      this.selectedGimnasios = value
        ? value.map((g: Gimnasio) => g.id_gimnasio)
        : []; // Convierte los objetos en IDs
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
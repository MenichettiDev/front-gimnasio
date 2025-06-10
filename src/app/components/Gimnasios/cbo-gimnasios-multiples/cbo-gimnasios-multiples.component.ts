import { Component, Input, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GimnasioService } from '../../../service/gimnasio.service';
import { Gimnasio } from '../../../data/interfaces/gimnasioInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cbo-gimnasios-multiples',
  templateUrl: './cbo-gimnasios-multiples.component.html',
  styleUrls: ['./cbo-gimnasios-multiples.component.css'],
  imports: [CommonModule, FormsModule],
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
  @Input() selectedGimnasios: number[] = []; // Valores seleccionados (IDs de los gimnasios)
  @Input() isDisabled: boolean = false; // Estado deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(private gimnasioService: GimnasioService) { }

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
    // Convierte los valores seleccionados a número
    this.selectedGimnasios = (this.selectedGimnasios || []).map((v: any) => +v);
    const valueToEmit = this.emitOnlyIds
      ? this.selectedGimnasios
      : this.gimnasios.filter((g) => this.selectedGimnasios.includes(g.id_gimnasio));

    this.onChange(valueToEmit);
    this.onTouched();
    this.valueChange.emit(this.selectedGimnasios);
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

  toggleGimnasio(id: number): void {
    const idx = this.selectedGimnasios.indexOf(id);
    if (idx === -1) {
      this.selectedGimnasios.push(id);
    } else {
      this.selectedGimnasios.splice(idx, 1);
    }
    this.onValueChange();
  }

  getGimnasioNombre(id: number): string {
    const gimnasio = this.gimnasios.find(g => g.id_gimnasio === id);
    return gimnasio ? gimnasio.nombre : '';
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
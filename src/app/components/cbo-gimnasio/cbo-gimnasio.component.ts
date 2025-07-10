import { Component, Input, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GimnasioService } from '../../service/gimnasio.service';
import { SharedGimnasioService } from '../../service/shared-gimnasio.service';
import { Gimnasio } from '../../data/interfaces/gimnasioInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cbo-gimnasio',
  templateUrl: './cbo-gimnasio.component.html',
  styleUrls: ['./cbo-gimnasio.component.css'],
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboGimnasioComponent),
      multi: true,
    },
  ],
})
export class CboGimnasioComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = 'Selecciona un Gimnasio'; // Etiqueta del combo
  @Input() emitOnlyId: boolean = false; // Controla si se emite solo el ID o el objeto completo
  @Input() placeholder: string = 'Selecciona un gimnasio';
  @Output() valueChange = new EventEmitter<number>();
  gimnasios: Gimnasio[] = []; // Lista de gimnasios
  selectedGimnasio: number | null = null; // Valor seleccionado (ID del gimnasio)
  isDisabled: boolean = false; // Estado deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(private gimnasioService: GimnasioService,
    private sharedGimnasioService: SharedGimnasioService
  ) { };


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

  // Maneja cambios en el select
  onValueChange(): void {
    const valueToEmit = this.emitOnlyId
      ? this.selectedGimnasio // Emite solo el ID si emitOnlyId es true
      : this.gimnasios.find((g) => g.id_gimnasio === this.selectedGimnasio); // Emite el objeto completo si emitOnlyId es false

    this.onChange(valueToEmit); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  onGimnasioChange(): void { //probando shared component
    if (this.selectedGimnasio) {
      this.onChange(this.selectedGimnasio);
      this.valueChange.emit(this.selectedGimnasio);
      this.sharedGimnasioService.setSelectedGimnasio(this.selectedGimnasio);
    }
  }

  // Métodos de ControlValueAccessor
  writeValue(value: any): void {
    if (this.emitOnlyId) {
      this.selectedGimnasio = value; // Asigna directamente el ID
    } else {
      const gimnasio = this.gimnasios.find((g) => g.id_gimnasio === value);
      this.selectedGimnasio = gimnasio ? gimnasio.id_gimnasio : null; // Busca el gimnasio por ID
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
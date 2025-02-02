import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GimnasioService } from '../../service/gimnasio.service';
import { SharedGimnasioService } from '../../service/shared-gimnasio.service';
import { Gimnasio } from '../../data/interfaces/gimnasioInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cbo-gimnasio',
  templateUrl: './cbo-gimnasio.component.html',
  styleUrls: ['./cbo-gimnasio.component.css'],
  imports:[ CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboGimnasioComponent),
      multi: true,
    },
  ],
})
export class CboGimnasioComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = "Selecciona un Gimnasio"; // Para el label del combo
  gimnasios: Gimnasio[] = []; // Lista de gimnasios
  selectedGimnasio: Gimnasio | null = null; // Valor seleccionado (objeto gimnasio)
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private gimnasioService: GimnasioService,
    private sharedService: SharedGimnasioService
  ) {}

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
  onGimnasioChange(event: any): void {
    if (this.selectedGimnasio) {
      this.sharedService.setSelectedGimnasio(this.selectedGimnasio); // Compartir gimnasio seleccionado
    }
    this.onChange(this.selectedGimnasio); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  // Métodos de ControlValueAccessor
  writeValue(value: any): void {
    this.selectedGimnasio = value || null; // Actualiza el valor interno
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
import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedGimnasioService } from '../../service/shared-gimnasio.service';
import { MembresiaService } from '../../service/membresia.service';
import { Gimnasio } from '../../data/interfaces/gimnasioInterface';
import { Membresia } from '../../data/interfaces/membresiaInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cbo-membresia',
  templateUrl: './cbo-membresia.component.html',
  styleUrls: ['./cbo-membresia.component.css'],
  imports: [ CommonModule, FormsModule ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboMembresiaComponent),
      multi: true,
    },
  ],
})
export class CboMembresiaComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = "Selecciona una Membresía"; // Para el label del combo
  gimnasioSeleccionado: Gimnasio | null = null;
  membresias: Membresia[] = []; // Lista de membresías
  selectedMembresia: Membresia | null = null; // Valor seleccionado (objeto membresía)
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private sharedService: SharedGimnasioService,
    private membresiaService: MembresiaService
  ) {}

  ngOnInit(): void {
    this.sharedService.selectedGimnasio$.subscribe((gimnasio) => {
      this.gimnasioSeleccionado = gimnasio;
      if (gimnasio) {
        this.cargarMembresias(gimnasio.id_gimnasio); // Carga las membresías según el gimnasio seleccionado
      }
    });
  }

  // Método para cargar las membresías
  cargarMembresias(id_gimnasio: number): void {
    this.membresiaService.getMembresiasByIdGimnasio(id_gimnasio).subscribe(
      (data) => {
        this.membresias = data; // Asignamos los datos de las membresías
      },
      (error) => {
        console.error('Error al obtener membresías', error);
      }
    );
  }

  // Maneja cambios en el select
  onValueChange(): void {
    this.onChange(this.selectedMembresia); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  // Métodos de ControlValueAccessor
  writeValue(value: any): void {
    this.selectedMembresia = value || null; // Actualiza el valor interno
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
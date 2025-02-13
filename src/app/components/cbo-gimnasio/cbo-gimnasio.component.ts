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
  @Input() label: string = 'Selecciona un Gimnasio';
  @Input() emitOnlyId: boolean = false; // Nuevo parámetro para controlar el comportamiento
  gimnasios: Gimnasio[] = [];
  selectedGimnasio: Gimnasio | null = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private gimnasioService: GimnasioService) {}

  ngOnInit(): void {
    this.obtenerGimnasios();
  }

  obtenerGimnasios(): void {
    this.gimnasioService.getGimnasios().subscribe(
      (data) => {
        this.gimnasios = data;
      },
      (error) => {
        console.error('Error al obtener gimnasios', error);
      }
    );
  }

  onGimnasioChange(event: any): void {
    const valueToEmit = this.emitOnlyId
      ? this.selectedGimnasio?.id_gimnasio || null // Emite solo el ID si emitOnlyId es true
      : this.selectedGimnasio; // Emite el objeto completo si emitOnlyId es false
    this.onChange(valueToEmit); // Emite el valor correspondiente
    this.onTouched();
  }

  writeValue(value: any): void {
    if (this.emitOnlyId) {
      // Si emitOnlyId es true, busca el gimnasio por ID
      this.selectedGimnasio = this.gimnasios.find((g) => g.id_gimnasio === value) || null;
    } else {
      // Si emitOnlyId es false, asigna el objeto directamente
      this.selectedGimnasio = value || null;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
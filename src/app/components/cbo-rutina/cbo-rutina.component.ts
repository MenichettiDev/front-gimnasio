import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RutinasService } from '../../service/rutinas.service';
import { Rutina } from '../../data/interfaces/tbRutinaInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cbo-rutina',
  standalone: true, // Opcional si usas Angular Standalone Components
  imports: [CommonModule, FormsModule],
  templateUrl: './cbo-rutina.component.html',
  styleUrls: ['./cbo-rutina.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboRutinaComponent),
      multi: true,
    },
  ],
})
export class CboRutinaComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = 'Seleccione una rutina'; // Etiqueta del combo
  @Input() id_atleta?: number; // ID del atleta (opcional)
  @Input() id_creador?: number; // ID del creador (opcional)
  rutinas: Rutina[] = []; // Lista de rutinas
  selectedRutina: number = 0; // Valor seleccionado
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private rutinaService: RutinasService) {}

  ngOnInit(): void {
    this.obtenerRutinas();
  }

  // Método para obtener las rutinas
  obtenerRutinas(): void {
    if (this.id_atleta) {
      this.rutinaService.getRutinaByIdAtleta(this.id_atleta).subscribe(
        (data) => (this.rutinas = data),
        (error) => console.error('Error al obtener rutinas por atleta', error)
      );
    } else if (this.id_creador) {
      this.rutinaService.getRutinaByIdCreador(this.id_creador).subscribe(
        (data) => (this.rutinas = data),
        (error) => console.error('Error al obtener rutinas por creador', error)
      );
    } else {
      this.rutinaService.getRutinasFree().subscribe(
        (data) => (this.rutinas = data),
        (error) => console.error('Error al obtener rutinas libres', error)
      );
    }
  }

  // Maneja cambios en el select
  onValueChange(): void {
    this.onChange(this.selectedRutina); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  // Métodos de ControlValueAccessor
  writeValue(value: number): void {
    this.selectedRutina = value ; // Actualiza el valor interno
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
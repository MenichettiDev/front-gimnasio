import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AtletaService } from '../../service/atleta.service';
import { Atleta } from '../../data/interfaces/atletaInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cbo-atleta',
  templateUrl: './cbo-atleta.component.html',
  styleUrls: ['./cbo-atleta.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboAtletaComponent),
      multi: true,
    },
  ],
})
export class CboAtletaComponent implements ControlValueAccessor {
  @Input() label: string = 'Seleccione un atleta'; // Etiqueta del combo
  @Input() idEntrenador!: number; // ID del entrenador (entrada obligatoria)
  atletas: Atleta[] = []; // Lista de atletas filtrados por entrenador
  selectedAtleta: number | null = null; // Valor seleccionado (id_atleta)
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private atletaService: AtletaService) {}

  ngOnInit(): void {
    if (!this.idEntrenador) {
      console.error('El ID del entrenador es obligatorio');
      return;
    }
    this.obtenerAtletasPorEntrenador();
  }

  // Método para obtener los atletas del entrenador
  obtenerAtletasPorEntrenador(): void {
    this.atletaService.getAtletasPorEntrenador(this.idEntrenador).subscribe(
      (data) => {
        this.atletas = data.atletas; // Asignamos los datos de los atletas
      },
      (error) => {
        console.error('Error al obtener atletas', error);
      }
    );
  }

  // Implementación de ControlValueAccessor
  writeValue(value: any): void {
    this.selectedAtleta = value || null; // Actualiza el valor interno
  }

  registerOnChange(fn: any): void {
    this.onChange = fn; // Registra la función de cambio
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn; // Registra la función de "tocado"
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled; // Habilita/deshabilita el control
  }

  // Maneja cambios en el select
  onValueChange(): void {
    // Asegúrate de que el valor sea un número antes de emitirlo
    if (typeof this.selectedAtleta === 'number') {
      this.onChange(this.selectedAtleta); // Emitir el valor seleccionado
    }
    this.onTouched();
  }
}
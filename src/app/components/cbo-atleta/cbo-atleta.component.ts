import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
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
  @Input() label: string = 'Selecciona un Atleta'; // Etiqueta del combo
  @Input() emitOnlyId: boolean = false; // Controla si se emite solo el ID o el objeto completo
  @Input() idEntrenador: number | null = null; // ID del entrenador para filtrar atletas
  @Output() valueChange = new EventEmitter<number | Atleta>(); // Emite el valor seleccionado (ID o objeto completo)

  atletas: Atleta[] = []; // Lista de atletas
  selectedAtleta: number | null = null; // Valor seleccionado (ID del atleta)
  isDisabled: boolean = false; // Estado deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private atletaService: AtletaService) {}

  ngOnInit(): void {
    this.obtenerAtletas();
  }

  // Método para obtener los atletas
  obtenerAtletas(): void {
    let atletasObservable;

    if (this.idEntrenador) {
      // Cargar atletas por entrenador
      atletasObservable = this.atletaService.getAtletasPorEntrenador(this.idEntrenador);
    } else {
      // Cargar todos los atletas
      atletasObservable = this.atletaService.getAtletas();
    }

    atletasObservable.subscribe(
      (data) => {
        this.atletas = data.atletas; // Asignamos los datos de los atletas
      },
      (error) => {
        console.error('Error al obtener atletas', error);
      }
    );
  }

  // Maneja cambios en el select
  onValueChange(): void {
    if (this.selectedAtleta === null) {
      return; // No emitir si no hay un atleta seleccionado
    }


    this.selectedAtleta = this.selectedAtleta*1; // Convertir a número


    const valueToEmit = this.emitOnlyId
      ? this.selectedAtleta // Emite solo el ID si emitOnlyId es true
      : this.atletas.find((a) => a.id_atleta === this.selectedAtleta); // Emite el objeto completo si emitOnlyId es false

    if (valueToEmit) {
      this.onChange(valueToEmit); // Notifica a Angular sobre el cambio
      this.onTouched(); // Marca el control como "tocado"
      this.valueChange.emit(valueToEmit); // Emite el valor seleccionado
    }
  }

  // Métodos de ControlValueAccessor
  writeValue(value: any): void {
    if (this.emitOnlyId) {
      this.selectedAtleta = value; // Asigna directamente el ID
    } else {
      const atleta = this.atletas.find((a) => a.id_atleta === value);
      this.selectedAtleta = atleta ? atleta.id_atleta : null; // Busca el atleta por ID
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

import { Component, Input, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GrupoMuscular } from '../../data/interfaces/grupoMuscularInterface';
import { GruposMuscularesService } from '../../service/grupos-musculares.service';
import { SharedGrupoMuscularService } from '../../service/shared-grupo-muscular.service';

@Component({
  selector: 'app-cbo-gruposmusculares',
  imports: [CommonModule, FormsModule],
  templateUrl: './cbo-gruposmusculares.component.html',
  styleUrls: ['./cbo-gruposmusculares.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboGruposmuscularesComponent),
      multi: true
    }
  ]
})
export class CboGruposmuscularesComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = 'Selecciona un Grupo Muscular';
  @Input() grupo: GrupoMuscular[] = [];
  @Output() valueChange = new EventEmitter<number>();

  gruposMusculares: GrupoMuscular[] = [];
  musculoSeleccionado: GrupoMuscular | null = null;
  private datosCargados = false; // Flag para indicar si los datos están cargados

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private grupoMuscularService: GruposMuscularesService,
    private sharedService: SharedGrupoMuscularService
  ) {}

  ngOnInit(): void {
    this.obtenerGruposMusculares();
  }

  obtenerGruposMusculares(): void {
    this.grupoMuscularService.getGruposMusculares().subscribe(
      (data) => {
        this.gruposMusculares = data;
        this.datosCargados = true; // Marcar que los datos están cargados
      },
      (error) => {
        console.error('Error al obtener grupos musculares', error);
      }
    );
  }

  onGrupoMuscularChange(): void {
    if (this.musculoSeleccionado) {
      this.onChange(this.musculoSeleccionado.id_grupo_muscular);
      this.valueChange.emit(this.musculoSeleccionado.id_grupo_muscular);
      this.sharedService.setSelectedGrupo(this.musculoSeleccionado);
    }
  }

  // Métodos de ControlValueAccessor
  writeValue(value: number): void {
    if (this.datosCargados) {
      // Buscar el grupo muscular correspondiente al valor recibido
      const musculoEncontrado = this.gruposMusculares.find(m => m.id_grupo_muscular === value);
      this.musculoSeleccionado = musculoEncontrado || null;
    } else {
      // Si los datos aún no están cargados, reintenta después de 100 ms
      setTimeout(() => {
        this.writeValue(value);
      }, 100);
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Aquí puedes manejar el estado deshabilitado si es necesario
  }
}
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AtletaService } from '../../service/atleta.service';
import { Atleta } from '../../data/interfaces/atletaInterface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';

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
  @Input() idGimnasio: number | null = null; // Nuevo input para gimnasio


  atletas: Atleta[] = []; // Lista de atletas
  selectedAtleta: number | null = null; // Valor seleccionado (ID del atleta)
  isDisabled: boolean = false; // Estado deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(
    private atletaService: AtletaService,
    private authService: AuthService // Inyectar servicio de autenticación
  ) { }
  ngOnInit(): void {
    this.selectedAtleta = null;  // Valor predeterminado
    this.obtenerAtletas();
  }


  // Método para obtener los atletas
  obtenerAtletas(): void {
    // Agregar logs para debugging
    const userProfile = this.authService.getIdAcceso();
    const userId = this.authService.getUserId();

    console.log('Perfil de usuario:', userProfile);
    console.log('ID de usuario:', userId);

    this.atletaService.getAtletasPorPerfil().subscribe({
      next: (data) => {
        console.log('Datos recibidos del servicio:', data);

        // Manejar diferentes estructuras de respuesta
        if (Array.isArray(data)) {
          // Si data es un array directo
          this.atletas = data;
        } else if (data && data.atletas && Array.isArray(data.atletas)) {
          // Si data tiene la propiedad atletas con un array
          this.atletas = data.atletas;
        } else if (data && !Array.isArray(data)) {
          // Si data es un objeto atleta único
          this.atletas = [data];
        } else {
          // Fallback
          this.atletas = [];
        }

        console.log('Atletas procesados:', this.atletas);
      },
      error: (error) => {
        console.error('Error al obtener atletas:', error);
        this.atletas = [];
      }
    });
  }

  // Maneja cambios en el select
  onValueChange(): void {
    // Convertir a número o asignar 0 si no hay selección
    this.selectedAtleta = this.selectedAtleta ? this.selectedAtleta * 1 : 0;

    const valueToEmit = this.emitOnlyId
      ? this.selectedAtleta // Emite el ID (0 si no hay selección)
      : this.selectedAtleta === 0
        ? 0 // Emite 0 en lugar de null para mantener consistencia
        : this.atletas.find((a) => a.id_atleta === this.selectedAtleta); // Emite el objeto completo

    this.onChange(valueToEmit); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
    this.valueChange.emit(valueToEmit); // Emite el valor seleccionado
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

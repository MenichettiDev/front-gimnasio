import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ejercicioRutina, plan } from '../../../data/interfaces/rutinaArmadaInterface';
import { EjerciciosService } from '../../../service/ejercicios.service';
import { GruposMuscularesService } from '../../../service/grupos-musculares.service';
import { RepeticionService } from '../../../service/repeticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-visor-rutina',
  imports: [CommonModule, FormsModule],
  templateUrl: './visor-rutina.component.html',
  styleUrl: './visor-rutina.component.css'
})
export class VisorRutinaComponent implements OnInit, OnChanges {
  @Input() rutinaCruda: plan | null = null; // Recibe la rutina cruda desde el padre
  rutinaSeleccionada: any = {}; // Detalles generales de la rutina (se genera internamente)
  rutina: any[] = []; // Lista de ejercicios mapeados (se genera internamente)
  progresoGeneral: number = 0;

  // Variables para almacenar los detalles adicionales
  detallesEjercicios: { [key: number]: any } = {};
  detallesGruposMusculares: { [key: number]: any } = {};
  detallesRepeticiones: { [key: number]: any } = {};

  constructor(
    private ejercicioService: EjerciciosService,
    private grupoMuscularService: GruposMuscularesService,
    private repeticionService: RepeticionService
  ) { }

  ngOnInit(): void {
    // Si la rutina cruda ya está disponible al inicializar, la mapeamos
    if (this.rutinaCruda) {
      this.mapearRutina(this.rutinaCruda);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si la rutina cruda cambia, la mapeamos nuevamente
    if (changes['rutinaCruda'] && this.rutinaCruda) {
      this.mapearRutina(this.rutinaCruda);
    }
  }


  async mapearRutina(rutina: plan): Promise<void> {
    this.rutinaSeleccionada = {
      nombre: rutina.rutina.nombre,
      objetivo: rutina.rutina.objetivo,
      descripcion: rutina.rutina.descripcion,
      fecha_asignacion: rutina.rutina.fecha_asignacion,
    };
  
    this.rutina = await Promise.all(rutina.ejercicios.map(async (dia) => {
      const ejerciciosMapeados = await Promise.all(dia.ejercicios.map(async (ejercicio) => {
        // Obtener detalles del ejercicio, grupo muscular y repetición
        const [ejercicioDetalle, grupoDetalle, repeticionDetalle] = await Promise.all([
          this.ejercicioService.getEjercicioById(ejercicio.id_ejercicio).toPromise()
            .then(data => data || { nombre: '---', descripcion: '---' }) // Valor predeterminado si es undefined
            .catch(() => ({ nombre: '---', descripcion: '---' })), // Valor predeterminado si hay error
          this.grupoMuscularService.getGrupoMuscularById(ejercicio.id_grupo_muscular).toPromise()
            .then(data => {
              // Guardar el detalle del grupo muscular en this.detallesGruposMusculares
              this.detallesGruposMusculares[ejercicio.id_grupo_muscular] = data || { nombre: '---' };
              return this.detallesGruposMusculares[ejercicio.id_grupo_muscular];
            })
            .catch(() => {
              this.detallesGruposMusculares[ejercicio.id_grupo_muscular] = { nombre: '---' };
              return this.detallesGruposMusculares[ejercicio.id_grupo_muscular];
            }),
          this.repeticionService.getRepeticionById(ejercicio.id_repeticion).toPromise()
            .then(data => data || { frecuencia: '---', nombre: '---' }) // Valor predeterminado si es undefined
            .catch(() => ({ frecuencia: '---', nombre: '---' })), // Valor predeterminado si hay error
        ]);
  
        return {
          ...ejercicio,
          nombre_ejercicio: ejercicioDetalle.nombre,
          descripcion_ejercicio: ejercicioDetalle.descripcion,
          nombre_grupo_muscular: grupoDetalle.nombre,
          repeticion_frecuencia: repeticionDetalle.frecuencia,
          repeticion_nombre: repeticionDetalle.nombre,
          completado: false, // Inicializamos todos los ejercicios como no completados
        };
      }));
  
      return {
        dia: dia.dia, // Número del día
        ejercicios: ejerciciosMapeados,
        expandido: false, // Estado inicial de la card del día (colapsada)
        gruposMusculares: this.obtenerGruposMusculares(dia.ejercicios).map((grupo) => ({
          nombre: this.detallesGruposMusculares[grupo]?.nombre || '---',
          expandido: false, // Estado inicial de la card del grupo muscular (colapsada)
        })),
      };
    }));
  }

  obtenerNombresGruposMusculares(ejercicios: ejercicioRutina[]): string[] {
    const nombresUnicos: string[] = [];
    ejercicios.forEach((ejercicio) => {
      const nombreGrupo = this.detallesGruposMusculares[ejercicio.id_grupo_muscular]?.nombre;
      if (nombreGrupo && !nombresUnicos.includes(nombreGrupo)) {
        nombresUnicos.push(nombreGrupo);
      }
    });
    return nombresUnicos;
  }

  obtenerGruposMusculares(ejercicios: any[]): number[] {
    const grupos = ejercicios.map((ejercicio) => ejercicio.id_grupo_muscular);
    return [...new Set(grupos)]; // Elimina duplicados
  }

  obtenerEjerciciosPorGrupoMuscular(ejercicios: any[], grupoMuscular: number): any[] {
    return ejercicios.filter(
      (ejercicio) => ejercicio.id_grupo_muscular === grupoMuscular
    );
  }

  // Método para desplegar/colapsar la card de un día
  toggleDia(index: number): void {
    this.rutina[index].expandido = !this.rutina[index].expandido;
  }

  // Método para desplegar/colapsar la card de un grupo muscular
  toggleGrupoMuscular(diaIndex: number, grupoIndex: number): void {
    this.rutina[diaIndex].gruposMusculares[grupoIndex].expandido =
      !this.rutina[diaIndex].gruposMusculares[grupoIndex].expandido;
  }

  // Métodos para calcular el progreso
  calcularPorcentajeDia(ejercicios: any[]): number {
    const totalEjercicios = ejercicios.length;
    const ejerciciosCompletados = ejercicios.filter((ejercicio) => ejercicio.completado).length;
    return (ejerciciosCompletados / totalEjercicios) * 100;
  }

  calcularProgreso(diaIndex: number): void {
    const dia = this.rutina[diaIndex];
    const progresoDia = this.calcularPorcentajeDia(dia.ejercicios);
    const totalDias = this.rutina.length;
    const progresoAcumulado = this.rutina.reduce((acc, dia) => acc + this.calcularPorcentajeDia(dia.ejercicios), 0);
    this.progresoGeneral = (progresoAcumulado / (totalDias * 100)) * 100;
  }

}

import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { plan } from '../../../../data/interfaces/rutinaArmadaInterface';
import { EjerciciosService } from '../../../../service/ejercicios.service';
import { GruposMuscularesService } from '../../../../service/grupos-musculares.service';
import { RepeticionService } from '../../../../service/repeticion.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pdf-rutina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-rutina.component.html',
  styleUrls: ['./pdf-rutina.component.css']
})
export class PdfRutinaComponent implements OnInit {
  @Input() rutinaCruda!: plan;

  // Inyección de servicios
  private ejerciciosService = inject(EjerciciosService);
  private gruposService = inject(GruposMuscularesService);
  private repeticionService = inject(RepeticionService);

  // Cache para evitar múltiples llamadas
  private ejerciciosCache = new Map<number, any>();
  private gruposCache = new Map<number, any>();
  private repeticionesCache = new Map<number, any>();

  // Flag para saber si ya se cargaron los datos
  datosResueltos = false;

  // nueva propiedad: fecha real para el pipe date
  currentDate: Date = new Date();

  async ngOnInit() {
    if (this.rutinaCruda) {
      await this.cargarDatosResueltos();
    }
  }

  // Cargar todos los datos necesarios de una vez
  private async cargarDatosResueltos(): Promise<void> {
    try {
      // Extraer todos los IDs únicos de la rutina
      const ejercicioIds = new Set<number>();
      const grupoIds = new Set<number>();
      const repeticionIds = new Set<number>();

      this.rutinaCruda.ejercicios?.forEach(dia => {
        dia.ejercicios?.forEach(ej => {
          if (ej.id_ejercicio) ejercicioIds.add(ej.id_ejercicio);
          if (ej.id_grupo_muscular) grupoIds.add(ej.id_grupo_muscular);
          if (ej.id_repeticion) repeticionIds.add(ej.id_repeticion);
        });
      });

      // Crear promesas para todas las llamadas necesarias
      const promises: Promise<any>[] = [];

      // Ejercicios
      Array.from(ejercicioIds).forEach(id => {
        promises.push(
          this.ejerciciosService.getEjercicioById(id).toPromise()
            .then(ejercicio => this.ejerciciosCache.set(id, ejercicio))
            .catch(err => console.warn(`Error cargando ejercicio ${id}:`, err))
        );
      });

      // Grupos musculares
      Array.from(grupoIds).forEach(id => {
        promises.push(
          this.gruposService.getGrupoMuscularById(id).toPromise()
            .then(grupo => this.gruposCache.set(id, grupo))
            .catch(err => console.warn(`Error cargando grupo ${id}:`, err))
        );
      });

      // Repeticiones
      Array.from(repeticionIds).forEach(id => {
        promises.push(
          this.repeticionService.getRepeticionById(id).toPromise()
            .then(repeticion => this.repeticionesCache.set(id, repeticion))
            .catch(err => console.warn(`Error cargando repetición ${id}:`, err))
        );
      });

      // Esperar a que todas las promesas se resuelvan
      await Promise.all(promises);
      this.datosResueltos = true;

    } catch (error) {
      console.error('Error cargando datos resueltos:', error);
      this.datosResueltos = true; // Continuar aunque haya errores
    }
  }

  // helper: devuelve nombre legible del ejercicio con varios fallbacks
  getEjercicioNombre(ejercicio: any): string {
    if (!ejercicio) return '';
    return ejercicio.nombre
      || ejercicio.nombre_ejercicio
      || ejercicio.ejercicio?.nombre
      || ejercicio.ejercicio?.titulo
      || (ejercicio.id_ejercicio ? `Ejercicio #${ejercicio.id_ejercicio}` : '');
  }

  // helper: devuelve label legible de la repetición/series con fallbacks
  getRepeticionLabel(ejercicio: any): string {
    if (!ejercicio) return '';
    // si existe objeto repeticion o repeticiones con nombre/descripcion
    const repObj = ejercicio.repeticion || ejercicio.repeticiones || ejercicio.repeticion_obj;
    if (repObj) {
      return repObj.nombre || repObj.descripcion || JSON.stringify(repObj);
    }
    // fallback a ids/valores
    if (ejercicio.repeticiones_texto) return ejercicio.repeticiones_texto;
    if (ejercicio.cantidad_repeticiones) return `${ejercicio.cantidad_repeticiones} reps`;
    if (ejercicio.id_repeticion) return `ID ${ejercicio.id_repeticion}`;
    return '';
  }

  // NUEVO: helper que devuelve un nombre de grupo seguro para usar en la plantilla
  getGrupoNombre(ejercicio: any): string {
    if (!ejercicio) return 'N/A';
    return ejercicio.grupo_nombre
      || ejercicio.grupo
      || (ejercicio.id_grupo_muscular ? `Grupo ${ejercicio.id_grupo_muscular}` : 'N/A');
  }

  // ALIAS solicitados: ahora usan el cache de datos resueltos
  getNombreEjercicio(ejercicio: any): string {
    if (!ejercicio || !ejercicio.id_ejercicio) return '';
    const ejercicioData = this.ejerciciosCache.get(ejercicio.id_ejercicio);
    return ejercicioData?.nombre || ejercicioData?.titulo || `Ejercicio #${ejercicio.id_ejercicio}`;
  }

  getNombreGrupoMuscular(ejercicio: any): string {
    if (!ejercicio || !ejercicio.id_grupo_muscular) return 'N/A';
    const grupoData = this.gruposCache.get(ejercicio.id_grupo_muscular);
    return grupoData?.nombre || `Grupo ${ejercicio.id_grupo_muscular}`;
  }

  getDescripcionRepeticion(ejercicio: any): string {
    if (!ejercicio || !ejercicio.id_repeticion) return '';
    const repeticionData = this.repeticionesCache.get(ejercicio.id_repeticion);
    return repeticionData?.nombre || repeticionData?.frecuencia || `ID: ${ejercicio.id_repeticion}`;
  }

  // Determinar si se debe hacer un salto de página antes de un día específico
  shouldBreakBefore(diaIndex: number): boolean {
    if (diaIndex === 0) return false;

    // Calcular espacio aproximado usado hasta ahora
    let totalEjercicios = 0;
    for (let i = 0; i < diaIndex; i++) {
      const dia = this.rutinaCruda?.ejercicios?.[i];
      if (dia?.ejercicios) {
        totalEjercicios += dia.ejercicios.length;
      }
    }

    // Salto de página cada ~15-20 ejercicios (aproximadamente 1 página A4)
    return totalEjercicios > 0 && totalEjercicios % 20 === 0;
  }
}
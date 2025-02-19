import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RutinasService } from '../../../service/rutinas.service'; // Importa el servicio
import { ejercicioRutina, plan, } from '../../../data/interfaces/rutinaArmadaInterface'; // Importa la interfaz
import { EjerciciosService } from '../../../service/ejercicios.service';
import { GruposMuscularesService } from '../../../service/grupos-musculares.service';
import { RepeticionService } from '../../../service/repeticion.service';
import { Ejercicio } from '../../../data/interfaces/ejercicioInterface';

@Component({
  selector: 'app-actual',
  imports: [CommonModule, FormsModule],
  templateUrl: './actual.component.html',
  styleUrl: './actual.component.css',
})
export class ActualComponent implements OnInit {
  rutinaSeleccionada: any = {}; // Aquí almacenamos los detalles generales de la rutina
  rutina: any[] = []; // Aquí almacenaremos la última rutina obtenida desde la base de datos
  progresoGeneral: number = 0;

  // Variables para almacenar los detalles adicionales
  detallesEjercicios: { [key: number]: any } = {}; // Almacena detalles de ejercicios por ID
  detallesGruposMusculares: { [key: number]: any } = {}; // Almacena detalles de grupos musculares por ID
  detallesRepeticiones: { [key: number]: any } = {}; // Almacena detalles de repeticiones por ID


  constructor(
    private rutinasService: RutinasService,
    private ejercicioService: EjerciciosService,
    private grupoMuscularService: GruposMuscularesService,
    private repeticionService: RepeticionService
  ) { }

  ngOnInit(): void {
    const idAtleta = 2; // Reemplaza con el id_atleta dinámico si es necesario
    this.obtenerRutinas(idAtleta);
  }

  obtenerRutinas(idAtleta: number): void {
    this.rutinasService.getRutinaByIdAtleta(idAtleta).subscribe(
      async (data: plan[]) => {
        if (data.length > 0) {
          const ultimaRutina = data[0];
          this.rutinaSeleccionada = {
            nombre: ultimaRutina.rutina.nombre,
            objetivo: ultimaRutina.rutina.objetivo,
            descripcion: ultimaRutina.rutina.descripcion,
            fecha_asignacion: ultimaRutina.rutina.fecha_asignacion,
          };
          this.rutina = await this.mapearRutina(ultimaRutina); // Mapea y obtiene detalles adicionales
          console.log('Rutina armada:', this.rutina);
        } else {
          console.warn('No se encontraron rutinas para el atleta.');
        }
      },
      (error) => {
        console.error('Error al obtener las rutinas:', error);
      }
    );
  }

  async mapearRutina(rutina: plan): Promise<any[]> {
    const rutinaMapeada = await Promise.all(rutina.ejercicios.map(async (dia) => {
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
  
    return rutinaMapeada;
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
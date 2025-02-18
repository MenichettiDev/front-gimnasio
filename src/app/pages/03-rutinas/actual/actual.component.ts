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

  // Método para obtener las rutinas desde el backend
  // obtenerRutinas(idAtleta: number): void {
  //   this.rutinasService.getRutinaByIdAtleta(idAtleta).subscribe(
  //     (data: plan[]) => {
  //       if (data.length > 0) {
  //         const ultimaRutina = data[0];
  //         this.rutinaSeleccionada = {
  //           nombre: ultimaRutina.rutina.nombre,
  //           objetivo: ultimaRutina.rutina.objetivo,
  //           descripcion: ultimaRutina.rutina.descripcion,
  //           fecha_asignacion: ultimaRutina.rutina.fecha_asignacion,
  //         };
  //         this.rutina = this.mapearRutina(ultimaRutina); // Mapea los datos de la API al formato que necesita el componente
  //         console.log( 'rutina armada' , this.rutina );
  //         this.obtenerDetallesAdicionales(); // Llamar a la función para obtener detalles adicionales
  //       } else {
  //         console.warn('No se encontraron rutinas para el atleta.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error al obtener las rutinas:', error);
  //     }
  //   );
  // }

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

//   obtenerDetallesAdicionales(): void {
//     console.log("Iniciando obtención de detalles adicionales...");

//     this.rutina.forEach((dia) => {
//         console.log("Procesando día:", dia);

//         dia.ejercicios.forEach((ejercicio: ejercicioRutina) => {
//             console.log("Procesando ejercicio:", ejercicio);

//             // Obtener nombre y descripción del ejercicio
//             this.ejercicioService.getEjercicioById(ejercicio.id_ejercicio).subscribe((ejercicioDetalle) => {
//                 console.log("Detalles del ejercicio obtenidos:", ejercicioDetalle);

//                 this.detallesEjercicios[ejercicio.id_ejercicio] = {
//                     nombre: ejercicioDetalle.nombre,
//                     descripcion: ejercicioDetalle.descripcion,
//                 };
//             });

//             // Obtener nombre del grupo muscular
//             this.grupoMuscularService.getGrupoMuscularById(ejercicio.id_grupo_muscular).subscribe((grupoDetalle) => {
//                 console.log("Detalles del grupo muscular obtenidos:", grupoDetalle);

//                 this.detallesGruposMusculares[ejercicio.id_grupo_muscular] = {
//                     nombre: grupoDetalle.nombre,
//                 };
//             });

//             // Obtener detalles de la repetición
//             this.repeticionService.getRepeticionById(ejercicio.id_repeticion).subscribe((repeticionDetalle) => {
//                 console.log("Detalles de la repetición obtenidos:", repeticionDetalle);

//                 this.detallesRepeticiones[ejercicio.id_repeticion] = {
//                     frecuencia: repeticionDetalle.frecuencia,
//                 };
//             });
//         });
//     });

//     console.log("Finalizada la obtención de detalles adicionales.");
// }

  // Método para mapear los datos de la API al formato que necesita el componente
  // mapearRutina(rutina: plan): any[] {
  //   return rutina.ejercicios.map((dia) => ({
  //     dia: dia.dia, // Número del día
  //     ejercicios: dia.ejercicios.map((ejercicio) => ({
  //       id_grupo_muscular: ejercicio.id_grupo_muscular,
  //       id_ejercicio: ejercicio.id_ejercicio, 
  //       repeticiones: ejercicio.id_repeticion,
  //       completado: false, // Inicializamos todos los ejercicios como no completados
  //     })),
  //     expandido: false, // Estado inicial de la card del día (colapsada)
  //     gruposMusculares: this.obtenerGruposMusculares(dia.ejercicios).map((grupo) => ({
  //       nombre: grupo,
  //       expandido: false, // Estado inicial de la card del grupo muscular (colapsada)
  //     })),
  //   }));
  // }
  async mapearRutina(rutina: plan): Promise<any[]> {
    const rutinaMapeada = await Promise.all(rutina.ejercicios.map(async (dia) => {
      const ejerciciosMapeados = await Promise.all(dia.ejercicios.map(async (ejercicio) => {
        // Obtener detalles del ejercicio, grupo muscular y repetición
        const [ejercicioDetalle, grupoDetalle, repeticionDetalle] = await Promise.all([
          this.ejercicioService.getEjercicioById(ejercicio.id_ejercicio).toPromise()
            .then(data => data || { nombre: '---', descripcion: '---' }) // Valor predeterminado si es undefined
            .catch(() => ({ nombre: '---', descripcion: '---' })), // Valor predeterminado si hay error
          this.grupoMuscularService.getGrupoMuscularById(ejercicio.id_grupo_muscular).toPromise()
            .then(data => data || { nombre: '---' }) // Valor predeterminado si es undefined
            .catch(() => ({ nombre: '---' })), // Valor predeterminado si hay error
          this.repeticionService.getRepeticionById(ejercicio.id_repeticion).toPromise()
            .then(data => data || { frecuencia: '---' }) // Valor predeterminado si es undefined
            .catch(() => ({ frecuencia: '---' })), // Valor predeterminado si hay error
        ]);
  
        return {
          ...ejercicio,
          nombre_ejercicio: ejercicioDetalle.nombre,
          descripcion_ejercicio: ejercicioDetalle.descripcion,
          nombre_grupo_muscular: grupoDetalle.nombre,
          frecuencia_repeticion: repeticionDetalle.frecuencia,
          completado: false, // Inicializamos todos los ejercicios como no completados
        };
      }));
  
      return {
        dia: dia.dia, // Número del día
        ejercicios: ejerciciosMapeados,
        expandido: false, // Estado inicial de la card del día (colapsada)
        gruposMusculares: this.obtenerGruposMusculares(dia.ejercicios).map((grupo) => ({
          nombre: grupo,
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
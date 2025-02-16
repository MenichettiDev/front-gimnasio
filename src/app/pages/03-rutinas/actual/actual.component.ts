import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RutinasService } from '../../../service/rutinas.service'; // Importa el servicio
import { plan } from '../../../data/interfaces/rutinaArmadaInterface'; // Importa la interfaz

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

  constructor(private rutinasService: RutinasService) {} // Inyecta el servicio

  ngOnInit(): void {
    const idAtleta = 2; // Reemplaza con el id_atleta dinámico si es necesario
    this.obtenerRutinas(idAtleta);
  }

  // Método para obtener las rutinas desde el backend
  obtenerRutinas(idAtleta: number): void {
    this.rutinasService.getRutinaByIdAtleta(idAtleta).subscribe(
      (data: plan[]) => {
        if (data.length > 0) {
          // Tomamos solo la primera rutina (índice 0)
          const ultimaRutina = data[0];
          this.rutinaSeleccionada = {
            nombre: ultimaRutina.rutina.nombre,
            objetivo: ultimaRutina.rutina.objetivo,
            descripcion: ultimaRutina.rutina.descripcion,
            fecha_asignacion: ultimaRutina.rutina.fecha_asignacion,
          };
          this.rutina = this.mapearRutina(ultimaRutina); // Mapea los datos de la API al formato que necesita el componente
        } else {
          console.warn('No se encontraron rutinas para el atleta.');
        }
      },
      (error) => {
        console.error('Error al obtener las rutinas:', error);
      }
    );
  }

  // Método para mapear los datos de la API al formato que necesita el componente
  mapearRutina(rutina: plan): any[] {
    return rutina.ejercicios.map((dia) => ({
      dia: dia.dia, // Número del día
      ejercicios: dia.ejercicios.map((ejercicio) => ({
        id_grupo_muscular: ejercicio.id_grupo_muscular,
        nombre: `Ejercicio ${ejercicio.id_ejercicio}`, // Puedes reemplazar esto con el nombre real del ejercicio si lo tienes
        descripcion: `Descripción del ejercicio ${ejercicio.id_ejercicio}`,
        repeticiones: ejercicio.id_repeticion,
        completado: false, // Inicializamos todos los ejercicios como no completados
      })),
      expandido: false, // Estado inicial de la card del día (colapsada)
      gruposMusculares: this.obtenerGruposMusculares(dia.ejercicios).map((grupo) => ({
        nombre: grupo,
        expandido: false, // Estado inicial de la card del grupo muscular (colapsada)
      })),
    }));
  }

  // Método para obtener los grupos musculares únicos de un día
  obtenerGruposMusculares(ejercicios: any[]): string[] {
    const grupos = ejercicios.map((ejercicio) => `Grupo Muscular ${ejercicio.id_grupo_muscular}`);
    return [...new Set(grupos)]; // Elimina duplicados
  }

  // Método para obtener los ejercicios de un grupo muscular específico
  obtenerEjerciciosPorGrupoMuscular(ejercicios: any[], grupoMuscular: string): any[] {
    return ejercicios.filter(
      (ejercicio) => `Grupo Muscular ${ejercicio.id_grupo_muscular}` === grupoMuscular
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
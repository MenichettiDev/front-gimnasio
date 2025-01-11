import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actual',
  imports: [CommonModule, FormsModule],
  templateUrl: './actual.component.html',
  styleUrl: './actual.component.css'
})
export class ActualComponent {
  
  // Datos duros (hardcoded) de la rutina
  rutina = [
    {
      dia: 'Lunes',
      ejercicios: [
        { nombre: 'Flexiones', descripcion: 'Ejercicio de pecho', completado: false },
        { nombre: 'Sentadillas', descripcion: 'Ejercicio de piernas', completado: false },
        { nombre: 'Abdominales', descripcion: 'Ejercicio para abdomen', completado: false }
      ]
    },
    {
      dia: 'Martes',
      ejercicios: [
        { nombre: 'Correr', descripcion: 'Ejercicio cardiovascular', completado: false },
        { nombre: 'Pesas', descripcion: 'Ejercicio de fuerza', completado: false },
        { nombre: 'Estiramientos', descripcion: 'Estiramientos para flexibilidad', completado: false }
      ]
    },
    {
      dia: 'Miércoles',
      ejercicios: [
        { nombre: 'Burpees', descripcion: 'Ejercicio de cuerpo completo', completado: false },
        { nombre: 'Plancha', descripcion: 'Ejercicio para abdomen y core', completado: false }
      ]
    }
  ];

  progresoGeneral: number = 0;

  // Calcular el progreso del día específico
  calcularPorcentajeDia(ejercicios: any[]): number {
    const totalEjercicios = ejercicios.length;
    const ejerciciosCompletados = ejercicios.filter(ejercicio => ejercicio.completado).length;
    return (ejerciciosCompletados / totalEjercicios) * 100;
  }

  // Calcular el progreso general de todos los días
  calcularProgreso(diaIndex: number): void {
    const dia = this.rutina[diaIndex];
    const progresoDia = this.calcularPorcentajeDia(dia.ejercicios);
    const totalDias = this.rutina.length;
    const progresoAcumulado = this.rutina.reduce((acc, dia) => acc + this.calcularPorcentajeDia(dia.ejercicios), 0);
    this.progresoGeneral = (progresoAcumulado / (totalDias * 100)) * 100;
  }


}

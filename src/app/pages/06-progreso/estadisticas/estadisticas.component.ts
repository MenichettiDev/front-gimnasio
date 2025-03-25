import { Component, OnInit } from '@angular/core';
import { MedidasService } from '../../../service/medidas.service'; // Ajusta la ruta según tu proyecto
import { AuthService } from '../../../service/auth/auth.service'; // Ajusta la ruta según tu proyecto
import { CommonModule } from '@angular/common';
import { Medida } from '../../../data/interfaces/tbMedidaInterface';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {
  idAtleta: number | null = null; // ID del atleta autenticado
  medidas: Medida[] = [];
  medidasFiltradas: Medida[] = [];

  // Datos para el gráfico
  chartData: any[] = [];
  chartLabels: string[] = [];
  chartOptions: any;

  // Variables disponibles y su estado de selección
  variablesDisponibles: { nombre: string; seleccionado: boolean }[] = [
    { nombre: 'peso', seleccionado: true },
    { nombre: 'biceps', seleccionado: false },
    { nombre: 'pecho', seleccionado: false },
    { nombre: 'hombros', seleccionado: false },
    { nombre: 'cintura', seleccionado: false },
    { nombre: 'gluteos', seleccionado: false },
    { nombre: 'cuadriceps', seleccionado: false },
    { nombre: 'gemelos', seleccionado: false },
    { nombre: 'antebrazo', seleccionado: false },
    { nombre: 'cuello', seleccionado: false },
    { nombre: 'grasa_corporal', seleccionado: false }
  ];

  constructor(
    private medidaService: MedidasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del atleta autenticado
    this.idAtleta = this.authService.getIdAtleta();
    if (this.idAtleta) {
      this.cargarMedidas(); // Cargar las medidas del atleta
    }
  }

  // Cargar las medidas del atleta
  cargarMedidas(): void {
    if (this.idAtleta) {
      this.medidaService.getMedidasByAtleta(this.idAtleta).subscribe(
        (data: Medida[]) => {
          this.medidas = data;
          this.medidasFiltradas = [...this.medidas]; // Inicializar lista filtrada
          this.prepararDatosGrafico(); // Preparar datos para el gráfico
        },
        (error) => {
          console.error('Error al cargar las medidas:', error);
        }
      );
    }
  }

  // Preparar datos para el gráfico
  prepararDatosGrafico(): void {
    // Extraer etiquetas (fechas)
    this.chartLabels = this.medidasFiltradas.map(medida => medida.fecha_medicion);

    // Filtrar las variables seleccionadas
    const variablesSeleccionadas = this.variablesDisponibles
      .filter(variable => variable.seleccionado)
      .map(variable => variable.nombre);

    // Crear conjuntos de datos para las variables seleccionadas
    this.chartData = variablesSeleccionadas.map(variable => ({
      label: variable.charAt(0).toUpperCase() + variable.slice(1), // Capitalizar el nombre
      data: this.medidasFiltradas.map(medida => medida[variable as keyof Medida]),
      fill: false,
      borderColor: this.getColorForVariable(variable),
      tension: 0.1
    }));

    // Configuración del gráfico
    this.chartOptions = {
      responsive: true,
      scales: {
        x: {
          type: 'category', // Especifica el tipo de escala
          title: {
            display: true,
            text: 'Fecha'
          }
        },
        y: {
          type: 'linear', // Especifica el tipo de escala
          title: {
            display: true,
            text: 'Valor'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    };
  }

  // Asignar colores únicos para cada variable
  getColorForVariable(variable: string): string {
    const colors: { [key: string]: string } = {
      peso: '#FF5733',
      biceps: '#33FF57',
      pecho: '#3357FF',
      hombros: '#F3FF33',
      cintura: '#FF33F3',
      gluteos: '#33FFF6',
      cuadriceps: '#FF8C33',
      gemelos: '#9C33FF',
      antebrazo: '#33FFB5',
      cuello: '#FF3333',
      grasa_corporal: '#3333FF'
    };
    return colors[variable] || '#000000'; // Color predeterminado si no se encuentra
  }

  // Actualizar el gráfico cuando cambie la selección
  actualizarGrafico(): void {
    this.prepararDatosGrafico();
  }
}
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { Medida } from '../../../data/interfaces/tbMedidaInterface';

Chart.register(...registerables);

@Component({
  selector: 'app-medidas-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './medidas-chart.component.html',
  styleUrls: ['./medidas-chart.component.css']
})
export class MedidasChartComponent implements OnInit, OnChanges {
  @Input() medidas: Medida[] = [];
  public Math = Math;

  // Configuración del gráfico de peso
  public pesoChartData: ChartConfiguration['data'] = {
    datasets: [{
      data: [],
      label: 'Peso (kg)',
      borderColor: '#4CAF50',
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#4CAF50',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6
    }],
    labels: []
  };

  // Configuración del gráfico de medidas corporales
  public medidasChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Bíceps (cm)',
        borderColor: '#FF6B35',
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        data: [],
        label: 'Pecho (cm)',
        borderColor: '#F7931E',
        backgroundColor: 'rgba(247, 147, 30, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        data: [],
        label: 'Cintura (cm)',
        borderColor: '#FFD23F',
        backgroundColor: 'rgba(255, 210, 63, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      },
      {
        data: [],
        label: 'Cuádriceps (cm)',
        borderColor: '#06FFA5',
        backgroundColor: 'rgba(6, 255, 165, 0.1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4
      }
    ],
    labels: []
  };

  // Configuración del gráfico de grasa corporal
  public grasaChartData: ChartConfiguration['data'] = {
    datasets: [{
      data: [],
      label: 'Grasa Corporal (%)',
      borderColor: '#E91E63',
      backgroundColor: 'rgba(233, 30, 99, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#E91E63',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6
    }],
    labels: []
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 20,
        top: 10,
        bottom: 10
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ffffff',
          font: {
            size: 12,
            family: 'Segoe UI'
          },
          usePointStyle: true,
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#4CAF50',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
          font: {
            size: 11
          },
          maxRotation: 45,
          minRotation: 0
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1
        },
        offset: true
      },
      y: {
        beginAtZero: false,
        ticks: {
          color: '#ffffff',
          font: {
            size: 11
          },
          padding: 10
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          lineWidth: 1
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8
      },
      line: {
        tension: 0.4
      }
    }
  };

  public chartType: ChartType = 'line';

  // Variable para controlar qué gráfico mostrar
  public tipoGraficoActivo: 'peso' | 'medidas' | 'grasa' = 'peso';

  ngOnInit(): void {
    this.actualizarGraficos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['medidas']) {
      this.actualizarGraficos();
    }
  }

  private actualizarGraficos(): void {
    if (!this.medidas || this.medidas.length === 0) return;

    // Ordenar medidas por fecha
    const medidasOrdenadas = [...this.medidas].sort((a, b) =>
      new Date(a.fecha_medicion).getTime() - new Date(b.fecha_medicion).getTime()
    );

    const fechas = medidasOrdenadas.map(medida =>
      new Date(medida.fecha_medicion).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit'
      })
    );

    // Actualizar gráfico de peso
    this.pesoChartData.labels = fechas;
    this.pesoChartData.datasets[0].data = medidasOrdenadas.map(medida => medida.peso);

    // Actualizar gráfico de medidas corporales
    this.medidasChartData.labels = fechas;
    this.medidasChartData.datasets[0].data = medidasOrdenadas.map(medida => medida.biceps);
    this.medidasChartData.datasets[1].data = medidasOrdenadas.map(medida => medida.pecho);
    this.medidasChartData.datasets[2].data = medidasOrdenadas.map(medida => medida.cintura);
    this.medidasChartData.datasets[3].data = medidasOrdenadas.map(medida => medida.cuadriceps);

    // Actualizar gráfico de grasa corporal
    this.grasaChartData.labels = fechas;
    this.grasaChartData.datasets[0].data = medidasOrdenadas.map(medida => medida.grasa_corporal);
  }

  public cambiarTipoGrafico(tipo: 'peso' | 'medidas' | 'grasa'): void {
    this.tipoGraficoActivo = tipo;
  }

  public get datosGraficoActivo(): ChartConfiguration['data'] {
    switch (this.tipoGraficoActivo) {
      case 'peso':
        return this.pesoChartData;
      case 'medidas':
        return this.medidasChartData;
      case 'grasa':
        return this.grasaChartData;
      default:
        return this.pesoChartData;
    }
  }
}
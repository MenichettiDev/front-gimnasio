import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  fecha: string;
  autor: string;
  categoria: string;
  imagen: string;
  tiempoLectura: string;
  tags: string[];
}

@Component({
  selector: 'app-noticias',
  imports: [CommonModule],
  templateUrl: './noticias.component.html',
  styleUrl: './noticias.component.css'
})
export class NoticiasComponent {
  noticias: Noticia[] = [
    {
      id: 1,
      titulo: "Los 5 Mejores Ejercicios para Ganar Masa Muscular",
      resumen: "Descubre los ejercicios más efectivos para desarrollar músculo de forma segura y eficiente.",
      contenido: "El desarrollo muscular efectivo requiere una combinación de ejercicios compuestos y aislados. Los ejercicios compuestos como sentadillas, peso muerto, press de banca, dominadas y remo trabajajan múltiples grupos musculares simultáneamente, maximizando el tiempo y esfuerzo invertido. Es crucial mantener una técnica correcta y progresión gradual en el peso para evitar lesiones y optimizar resultados.",
      fecha: "2024-07-08",
      autor: "Dr. Carlos Mendoza",
      categoria: "Entrenamiento",
      imagen: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=250&fit=crop",
      tiempoLectura: "5 min",
      tags: ["Hipertrofia", "Fuerza", "Ejercicios"]
    },
    {
      id: 2,
      titulo: "Nutrición Pre y Post Entreno: Guía Completa",
      resumen: "Optimiza tu rendimiento y recuperación con las mejores estrategias nutricionales.",
      contenido: "La nutrición adecuada antes y después del entrenamiento es fundamental para maximizar el rendimiento y la recuperación. Antes del entrenamiento, consume carbohidratos complejos y una pequeña cantidad de proteína 1-2 horas antes. Post-entreno, la ventana anabólica de 30-60 minutos es crucial para la síntesis proteica y reposición de glucógeno. Una relación 3:1 de carbohidratos a proteína es ideal.",
      fecha: "2024-07-06",
      autor: "Lic. Ana García",
      categoria: "Nutrición",
      imagen: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=250&fit=crop",
      tiempoLectura: "7 min",
      tags: ["Nutrición", "Recuperación", "Rendimiento"]
    },
    {
      id: 3,
      titulo: "Rutina de Cardio HIIT: Quema Grasa en 20 Minutos",
      resumen: "Entrena de forma inteligente con intervalos de alta intensidad para resultados máximos.",
      contenido: "El entrenamiento HIIT (High Intensity Interval Training) es una de las formas más eficientes de quemar grasa y mejorar la condición cardiovascular. Alterna períodos cortos de ejercicio intenso con períodos de recuperación activa. Un ejemplo: 30 segundos de burpees seguidos de 30 segundos de caminar, repetido por 20 minutos. Este método acelera el metabolismo hasta 24 horas después del entrenamiento.",
      fecha: "2024-07-04",
      autor: "Entrenador Miguel Torres",
      categoria: "Cardio",
      imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      tiempoLectura: "4 min",
      tags: ["HIIT", "Cardio", "Pérdida de peso"]
    },
    {
      id: 4,
      titulo: "Importancia del Descanso en el Crecimiento Muscular",
      resumen: "El sueño y la recuperación son tan importantes como el entrenamiento para lograr tus objetivos.",
      contenido: "El crecimiento muscular ocurre durante el descanso, no durante el entrenamiento. Durante el sueño profundo, el cuerpo libera hormona del crecimiento y lleva a cabo procesos de reparación y síntesis proteica. Se recomienda dormir 7-9 horas por noche y tomar días de descanso activo. La sobreexigencia puede llevar al sobreentrenamiento, reduciendo el rendimiento y aumentando el riesgo de lesiones.",
      fecha: "2024-07-02",
      autor: "Dr. Patricia Ruiz",
      categoria: "Recuperación",
      imagen: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop",
      tiempoLectura: "6 min",
      tags: ["Descanso", "Sueño", "Recuperación"]
    }
  ];

  noticiaSeleccionada: Noticia | null = null;

  verNoticia(noticia: Noticia) {
    this.noticiaSeleccionada = noticia;
  }

  cerrarNoticia() {
    this.noticiaSeleccionada = null;
  }

  getCategoriaColor(categoria: string): string {
    switch (categoria.toLowerCase()) {
      case 'entrenamiento': return '#4CAF50';
      case 'nutrición': return '#FF9800';
      case 'cardio': return '#2196F3';
      case 'recuperación': return '#9C27B0';
      default: return '#607D8B';
    }
  }
}
import { Component, Input, OnInit, OnChanges, SimpleChanges, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ejercicioRutina, plan } from '../../../data/interfaces/rutinaArmadaInterface';
import { EjerciciosService } from '../../../service/ejercicios.service';
import { GruposMuscularesService } from '../../../service/grupos-musculares.service';
import { RepeticionService } from '../../../service/repeticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


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

  // Video modal properties
  showVideoModal: boolean = false;
  selectedVideoUrl: SafeResourceUrl | null = null;
  selectedVideoTitle: string = '';
  currentVideoIsShort: boolean = false;

  @ViewChildren('diaCard') diaCards!: QueryList<ElementRef>;
  @ViewChildren('grupoCard') grupoCards!: QueryList<ElementRef>;

  constructor(
    private ejercicioService: EjerciciosService,
    private grupoMuscularService: GruposMuscularesService,
    private repeticionService: RepeticionService,
    private sanitizer: DomSanitizer
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
            .then(data => data || { nombre: '---', descripcion: '---', link_video: '---' }) // Valor predeterminado si es undefined
            .catch(() => ({ nombre: '---', descripcion: '---', link_video: '---' })), // Valor predeterminado si hay error
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
          link_video_ejercicio: ejercicioDetalle.link_video,
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
  toggleDia(index: number) {
    this.rutina.forEach((dia, i) => {
      dia.expandido = (i === index) ? !dia.expandido : false;
      if (!dia.expandido && dia.gruposMusculares) {
        dia.gruposMusculares.forEach((grupo: any) => {
          grupo.expandido = false;
          if (grupo.ejercicios) {
            grupo.ejercicios.forEach((ej: any) => ej.expandido = false);
          }
        });
      }
    });
    setTimeout(() => {
      if (this.rutina[index].expandido && this.diaCards && this.diaCards.toArray()[index]) {
        this.diaCards.toArray()[index].nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  // Método para desplegar/colapsar la card de un grupo muscular
  toggleGrupoMuscular(diaIndex: number, grupoIndex: number) {
    const grupos = this.rutina[diaIndex].gruposMusculares;
    grupos.forEach((grupo: any, idx: number) => {
      grupo.expandido = (idx === grupoIndex) ? !grupo.expandido : false;
      if (!grupo.expandido && grupo.ejercicios) {
        grupo.ejercicios.forEach((ej: any) => ej.expandido = false);
      }
    });
    setTimeout(() => {
      // Encuentra el índice absoluto del grupoCard en el QueryList
      const grupoCardIndex = this.getGrupoCardIndex(diaIndex, grupoIndex);
      if (grupos[grupoIndex].expandido && this.grupoCards && this.grupoCards.toArray()[grupoCardIndex]) {
        this.grupoCards.toArray()[grupoCardIndex].nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }

  // Ayuda a encontrar el índice absoluto del grupoCard en el QueryList
  getGrupoCardIndex(diaIndex: number, grupoIndex: number): number {
    let idx = 0;
    for (let i = 0; i < diaIndex; i++) {
      idx += this.rutina[i].gruposMusculares.length;
    }
    return idx + grupoIndex;
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

  // Método para expandir toda la rutina (todos los días y grupos musculares)
  expandirTodaRutina(): void {
    this.rutina.forEach((dia: any) => {
      dia.expandido = true;
      dia.gruposMusculares.forEach((grupo: any) => {
        grupo.expandido = true;
      });
    });
  }

  // Video modal methods
  openVideoModal(videoUrl: string, exerciseName: string): void {
    if (videoUrl && videoUrl !== '---') {
      this.selectedVideoUrl = this.getSafeUrl(videoUrl);
      this.selectedVideoTitle = exerciseName;
      this.showVideoModal = true;
      document.body.style.overflow = 'hidden';
    }
  }

  closeVideoModal(): void {
    this.showVideoModal = false;
    this.selectedVideoUrl = null;
    this.selectedVideoTitle = '';
    this.currentVideoIsShort = false;
    document.body.style.overflow = 'auto';
  }

  onVideoModalBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeVideoModal();
    }
  }

  // Video URL sanitization method
  getSafeUrl(url: string): SafeResourceUrl {
    this.currentVideoIsShort = false;

    if (!url || url === '---') {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }

    let embedUrl = url;

    // Detectar YouTube Shorts: /shorts/VIDEO_ID
    if (url.includes('/shorts/')) {
      const parts = url.split('/shorts/');
      const id = parts[1]?.split(/[?&]/)[0];
      if (id) {
        embedUrl = `https://www.youtube.com/embed/${id}`;
        this.currentVideoIsShort = true;
      }
    } else if (url.includes('youtube.com/watch?v=')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      const videoId = urlParams.get('v');
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Opcional: parámetros comunes para evitar sugerencias (rel=0)
    if (!embedUrl.includes('?')) {
      embedUrl += '?rel=0';
    } else if (!/rel=/.test(embedUrl)) {
      embedUrl += '&rel=0';
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  getYoutubeThumbnail(url: string): string | null {
    if (!url) return null;
    let videoId: string | null = null;
    if (url.includes('youtube.com/watch?v=')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get('v');
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split(/[?&]/)[0];
    } else if (url.includes('/shorts/')) {
      videoId = url.split('/shorts/')[1].split(/[?&]/)[0];
    }
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
  }

}

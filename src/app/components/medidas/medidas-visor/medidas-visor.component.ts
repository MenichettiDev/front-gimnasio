import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para [(ngModel)]
import { MedidaFormComponent } from '../../../components/medidas/medida-form/medida-form.component'; // Importa el formulario
import { MedidasService } from '../../../service/medidas.service'; // Servicio de medidas
import { AuthService } from '../../../service/auth/auth.service'; // Servicio de autenticación
import { Medida } from '../../../data/interfaces/tbMedidaInterface';
import { MedidasChartComponent } from "../medidas-chart/medidas-chart.component"; // Interfaz de medidas

@Component({
  selector: 'app-medidas-visor',
  imports: [CommonModule, FormsModule, MedidasChartComponent], // Agrega FormsModule aquí
  templateUrl: './medidas-visor.component.html',
  styleUrls: ['./medidas-visor.component.css'],
})
export class MedidasVisorComponent {
  @Input() idAtletaExterno: number | null = null;
  medidas: Medida[] = []; // Lista completa de medidas del atleta
  medidasFiltradas: Medida[] = []; // Lista filtrada de medidas (para búsqueda)
  mostrarFormulario = false; // Controla la visibilidad del formulario
  medidaSeleccionada: Medida | null = null; // Medida seleccionada para edición
  idAtleta: number | null = null; // ID del atleta autenticado

  // Variables para la paginación
  currentPage = 1; // Página actual
  pageSize = 5; // Número de elementos por página

  // Nueva variable para controlar la vista
  vistaActiva: 'tabla' | 'grafico' = 'tabla';

  constructor(
    private medidaService: MedidasService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del atleta autenticado
    this.idAtleta = this.idAtletaExterno || this.authService.getIdAtleta();
    if (this.idAtleta) {
      this.cargarMedidas(); // Cargar las medidas del atleta
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Detectar cambios en el input idAtletaExterno
    if (changes['idAtletaExterno'] && this.idAtletaExterno !== null) {
      this.idAtleta = this.idAtletaExterno; // Actualizar el ID del atleta

      // Limpiar las medidas antes de cargarlas
      this.medidas = [];
      this.medidasFiltradas = [];

      this.cargarMedidas(); // Recargar las medidas
    } else {
      // Limpiar medidas cuando no hay atleta seleccionado
      this.medidas = [];
      this.medidasFiltradas = [];
    }
  }



  // Cargar las medidas del atleta
  cargarMedidas(): void {
    if (this.idAtleta) {
      this.medidaService.getMedidasByAtleta(this.idAtleta).subscribe(
        (data: Medida[]) => {
          this.medidas = data;
          this.medidasFiltradas = [...this.medidas]; // Inicializar lista filtrada
        },
        (error) => {
          console.error('Error al cargar las medidas:', error);
          // También podrías mostrar un modal o mensaje indicando que no se encontraron medidas
        }
      );
    } else {
      this.medidas = [];  // Si no hay ID de atleta, limpia las medidas
      this.medidasFiltradas = [];
    }
  }


  // Obtener las medidas de la página actual
  get medidasPaginadas(): Medida[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.medidasFiltradas.slice(startIndex, endIndex);
  }

  // Calcular el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.medidasFiltradas.length / this.pageSize);
  }

  // Navegar a la página anterior
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Navegar a la página siguiente
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Abrir el formulario (creación o edición)
  abrirFormulario(medida?: Medida): void {
    this.medidaSeleccionada = medida || null; // Pasa la medida si está en modo edición
    this.mostrarFormulario = true; // Muestra el formulario
  }

  // Cerrar el formulario
  cerrarFormulario(): void {
    this.mostrarFormulario = false; // Oculta el formulario
    this.medidaSeleccionada = null; // Limpia la medida seleccionada
  }

  // Manejar el evento de guardar desde el formulario
  onGuardar(medida: Medida): void {
    if (this.medidaSeleccionada) {
      // Modo edición
      this.medidaService
        .actualizarMedida(
          this.medidaSeleccionada.id_medida,
          this.idAtleta!,
          medida.fecha_medicion,
          medida.peso,
          medida.altura,
          medida.biceps,
          medida.pecho,
          medida.hombros,
          medida.cintura,
          medida.gluteos,
          medida.cuadriceps,
          medida.gemelos,
          medida.antebrazo,
          medida.cuello,
          medida.grasa_corporal
        )
        .subscribe(
          () => {
            this.cargarMedidas(); // Recargar la lista de medidas
            this.cerrarFormulario(); // Cerrar el formulario
          },
          (error) => {
            console.error('Error al actualizar la medida:', error);
          }
        );
    } else {
      // Modo creación
      if (this.idAtleta) {
        this.medidaService
          .crearMedida(
            this.idAtleta,
            medida.fecha_medicion,
            medida.peso,
            medida.altura,
            medida.biceps,
            medida.pecho,
            medida.hombros,
            medida.cintura,
            medida.gluteos,
            medida.cuadriceps,
            medida.gemelos,
            medida.antebrazo,
            medida.cuello,
            medida.grasa_corporal
          )
          .subscribe(
            () => {
              this.cargarMedidas(); // Recargar la lista de medidas
              this.cerrarFormulario(); // Cerrar el formulario
            },
            (error) => {
              console.error('Error al crear la medida:', error);
            }
          );
      }
    }
  }

  // Eliminar una medida
  eliminarMedida(id: number): void {
    this.medidaService.eliminarMedida(id).subscribe(
      () => {
        this.cargarMedidas(); // Recargar la lista de medidas
      },
      (error) => {
        console.error('Error al eliminar la medida:', error);
      }
    );
  }

  // Nuevo método para cambiar vista
  cambiarVista(vista: 'tabla' | 'grafico'): void {
    this.vistaActiva = vista;
  }
}

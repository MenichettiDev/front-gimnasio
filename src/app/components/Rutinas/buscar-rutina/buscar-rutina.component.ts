import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CboObjetivoComponent } from "../../../components/cbo-objetivo/cbo-objetivo.component";
import { CboAtletaComponent } from "../../../components/cbo-atleta/cbo-atleta.component";
import { CboNiveldificultadComponent } from "../../../components/cbo-niveldificultad/cbo-niveldificultad.component";
import { CboDiasComponent } from "../../../components/cbo-dias/cbo-dias.component";
import { CommonModule } from '@angular/common'; // Para usar ngModel y otras directivas comunes
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para habilitar ngModel en formularios
import { FetchBackend, HttpClientModule } from '@angular/common/http'; // Para realizar solicitudes HTTP
import { RutinasService } from '../../../service/rutinas.service';
import { InputTextoComponent } from "../../input-texto/input-texto.component";
import { InputFechaComponent } from "../../input-fecha/input-fecha.component";

@Component({
  selector: 'app-buscar-rutina',
  imports: [
    CboObjetivoComponent,
    CboAtletaComponent,
    CboNiveldificultadComponent,
    CboDiasComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextoComponent,
    InputFechaComponent
],
  templateUrl: './buscar-rutina.component.html',
  styleUrl: './buscar-rutina.component.css'
})
export class BuscarRutinaComponent implements OnInit {
  filtroForm: FormGroup = new FormGroup({});
  loading = false;
// Eventos para comunicarse con el componente padre
@Output() rutinasEncontradas = new EventEmitter<any>();
@Output() filtrosAceptados = new EventEmitter<any>();


  constructor(private rutinaService: RutinasService,
      private fb: FormBuilder,
  ) { };

  ngOnInit(): void {
      this.createForm();
  }

  createForm(): void {
      this.filtroForm = this.fb.group({
          nombre: '',
          fechaDesde: null,
          fechaHasta: null,
          objetivo: '',
          idAtleta: null,
          nivelAtleta: '',
          cantidadDias: ''
      });
  }

  onSubmit() {
      // Validar que al menos un campo esté lleno
      console.log('Filtro:', this.filtroForm.value);
      if (
        !this.filtroForm.value.nombre &&
        !this.filtroForm.value.fechaDesde &&
        !this.filtroForm.value.fechaHasta &&
        !this.filtroForm.value.objetivo &&
        !this.filtroForm.value.idAtleta &&
        !this.filtroForm.value.nivelAtleta &&
        !this.filtroForm.value.cantidadDias
      ) {
        alert('Debe seleccionar al menos un criterio de búsqueda.');
        return;
      }
      
      this.filtroForm.value.fechaDesde = this.formatoFecha(this.filtroForm.value.fechaDesde);
      this.filtroForm.value.fechaHasta = this.formatoFecha(this.filtroForm.value.fechaHasta);

      this.loading = true;
      // Llamar al servicio para buscar las rutinas
      this.rutinaService.filtrada(this.filtroForm.value).subscribe(
          (response) => {
              console.log('Rutinas encontradas:', response);
              this.loading = false;
              // Aquí puedes manejar la respuesta, por ejemplo, mostrar las rutinas en una tabla
              this.rutinasEncontradas.emit(response);
          },
          (error) => {
              console.error('Error al buscar rutinas:', error);
              this.loading = false;
              alert('Ocurrió un error al buscar las rutinas.');
          }
      );
  }

  onAceptar() {
    // Emitir los filtros actuales al componente padre
    this.filtrosAceptados.emit(this.filtroForm.value);
  }

  limpiarFiltros() {
    this.filtroForm.reset();
  }

  formatoFecha(fecha: Date | string): string {
      if (!fecha) return '';
      const fechaDate = new Date(fecha);
      const year = fechaDate.getFullYear();
      const month = String(fechaDate.getMonth() + 1).padStart(2, '0');
      const day = String(fechaDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }
}

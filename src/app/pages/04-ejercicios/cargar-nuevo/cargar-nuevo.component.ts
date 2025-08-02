import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CboGruposmuscularesComponent } from '../../../components/cbo-gruposmusculares/cbo-gruposmusculares.component';
import { CboEjercicioComponent } from '../../../components/cbo-ejercicio/cbo-ejercicio.component';
import { GruposMuscularesService } from '../../../service/grupos-musculares.service';
import { EjerciciosService } from '../../../service/ejercicios.service';
import { SharedGrupoMuscularService } from '../../../service/shared-grupo-muscular.service';
import { ConfirmacionService } from '../../../service/confirmacion.service';
import { CommonModule } from '@angular/common';
import { GrupoMuscular } from '../../../data/interfaces/grupoMuscularInterface';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-cargar-nuevo',
  imports: [CboGruposmuscularesComponent,
    FormsModule,
    CommonModule, ReactiveFormsModule,
    ToastModule, ConfirmDialogModule,
    ProgressSpinnerModule],
  templateUrl: './cargar-nuevo.component.html',
  styleUrl: './cargar-nuevo.component.css'
})
export class CargarNuevoComponent {
  loading: boolean = false;
  exerciseForm: FormGroup = new FormGroup({});
  selectedGrupoMuscular: number | null = null;
  selectedEjercicio: number | null = null;
  isEditable: boolean = false;
  gruposMusculares: GrupoMuscular[] = [];

  constructor(
    private fb: FormBuilder,
    private grupoMuscularService: GruposMuscularesService,
    private ejercicioService: EjerciciosService,
    private confirmacionService: ConfirmacionService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.obtenerGruposMusculares();
  }

  obtenerGruposMusculares(): void {
    this.grupoMuscularService.getGruposMusculares().subscribe(
      (data) => {
        this.gruposMusculares = data; // Llenar el combo
      },
      (error) => {
        console.error('Error al obtener grupos musculares', error);
      }
    );
  }

  createForm(): void {
    this.exerciseForm = this.fb.group({
      id_grupo_muscular: [''],
      id_entrenador: [null],
      nombre: [''],
      img_1: [''],
      img_2: [''],
      img_3: [''],
      descripcion: [''],
      link_video: ['']
    });
  }



  async cargarEjercicio() {
    const confirmed = await this.confirmacionService.confirmAction('¿Estás seguro de que deseas proceder?', 'Confirmación');

    if (confirmed) {
      this.loading = true; // Mostrar spinner

      // Log para depuración

      if (this.exerciseForm.valid) {
        // Llamar al servicio para crear el ejercicio
        this.ejercicioService.createEjercicio(this.exerciseForm.value).subscribe(
          response => {
            // Si la respuesta es exitosa
            this.isEditable = false;

            // Limpiar el formulario
            this.resetStatus();

            // Ocultar el spinner y mostrar el mensaje de éxito
            this.loading = false;
            this.confirmacionService.showSuccess('Operación exitosa');
          },
          error => {
            // Si ocurre un error
            this.loading = false; // Detener el spinner
            console.error('Error al crear el ejercicio', error);
            this.confirmacionService.showError('Error al crear el ejercicio');
          }
        );
      } else {
        // Si el formulario no es válido
        this.loading = false;
        this.confirmacionService.showError('Por favor, complete todos los campos');
      }
    }
  }


  resetStatus(): void {
    this.exerciseForm.reset();
    window.scrollTo(0, 0);
    this.obtenerGruposMusculares();
  }
}

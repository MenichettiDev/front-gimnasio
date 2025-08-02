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
import { ModalToastComponent } from '../../../components/modal/modal-toast/modal-toast.component';


@Component({
  selector: 'app-cargar-nuevo',
  imports: [
    CboGruposmuscularesComponent,
    FormsModule,
    CommonModule, ReactiveFormsModule,
    ToastModule, ConfirmDialogModule,
    ProgressSpinnerModule,
    ModalToastComponent
  ],
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

  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: string = 'success';

  constructor(
    private fb: FormBuilder,
    private grupoMuscularService: GruposMuscularesService,
    private ejercicioService: EjerciciosService
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
    if (this.exerciseForm.valid) {
      this.loading = true;
      this.ejercicioService.createEjercicio(this.exerciseForm.value).subscribe(
        response => {
          this.isEditable = false;
          this.resetStatus();
          this.loading = false;
          this.showToast('Ejercicio creado exitosamente!', 'success');
          setTimeout(() => {
            // Si necesitas navegar, hazlo aquí, por ejemplo:
            // this.router.navigate(['/ruta']);
          }, 1800);
        },
        error => {
          this.loading = false;
          console.error('Error al crear el ejercicio', error);
          this.showToast('Error al crear el ejercicio', 'error');
        }
      );
    } else {
      this.loading = false;
      this.showToast('Por favor, complete todos los campos', 'error');
    }
  }

  showToast(message: string, type: string = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 2500);
  }

  resetStatus(): void {
    this.exerciseForm.reset();
    window.scrollTo(0, 0);
    this.obtenerGruposMusculares();
  }
}

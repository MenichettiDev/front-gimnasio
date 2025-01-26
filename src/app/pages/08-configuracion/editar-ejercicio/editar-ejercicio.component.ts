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
  selector: 'app-editar-ejercicio',
  imports: [CboGruposmuscularesComponent,
    CboEjercicioComponent, FormsModule,
    CommonModule, ReactiveFormsModule,
    ToastModule, ConfirmDialogModule,
    ProgressSpinnerModule],
  templateUrl: './editar-ejercicio.component.html',
  styleUrls: ['./editar-ejercicio.component.css'],
  // providers: [ConfirmationService, MessageService],
})
export class EditarEjercicioComponent implements OnInit {
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
    private sharedGrupoMuscularService: SharedGrupoMuscularService,
    private confirmacionService: ConfirmacionService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.obtenerGruposMusculares();
    this.subscribeToGrupoMuscularChanges();
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
      idEjercicio: [''],
      idGrupoMuscular: [''],
      id_ejercicio: [''],
      id_grupo_muscular: [''],
      nombre: [''],
      img_1: [''],
      img_2: [''],
      img_3: [''],
      descripcion: [''],
      link_video: ['']
    });
    this.exerciseForm.disable();
  }

  subscribeToGrupoMuscularChanges(): void {
    this.sharedGrupoMuscularService.selectedGrupo$.subscribe(grupo => {
      if (grupo) {
        this.selectedGrupoMuscular = grupo.id_grupo_muscular;
        this.exerciseForm.controls['idGrupoMuscular'].setValue(grupo.id_grupo_muscular);
        this.isEditable = true;
      }
    });
  }

  onGrupoMuscularChange(musculo: number): void {
    if (musculo) {
      this.selectedGrupoMuscular = musculo;
      // console.log('frupo muscular seleccionado: ' + musculo);
      this.exerciseForm.controls['idGrupoMuscular'].setValue(musculo);
      this.isEditable = true;
      // this.sharedGrupoMuscularService.setSelectedGrupo(musculo);
    }
  }

  onEjercicioChange(id_ejercicio: number): void {
    this.selectedEjercicio = id_ejercicio;

    this.ejercicioService.getEjercicioById(id_ejercicio).subscribe(data => {
      this.exerciseForm.patchValue(data);
      this.exerciseForm.enable();
    }, error => {
      console.error('Error al cargar el ejercicio', error);
    });
  }

  // onSubmit(): void {
  //   if (this.exerciseForm.valid) {
  //     this.ejercicioService.updateEjercicio(this.exerciseForm.value).subscribe(response => {
  //       alert('Ejercicio modificado exitosamente');
  //       this.isEditable = false;
  //       // Limpiar el formulario
  //       this.resetStatus();

  //     }, error => {
  //       console.error('Error al modificar ejercicio', error);
  //     });
  //   }
  // }

  onDelete(): void {
    if (this.selectedEjercicio) {
      this.ejercicioService.deleteEjercicio(this.selectedEjercicio).subscribe(response => {
        alert('Ejercicio eliminado exitosamente');
        this.createForm();
        this.resetStatus();
      }, error => {
        console.error('Error al eliminar ejercicio', error);
      });
    }
  }

  async onSubmit() {
    const confirmed = await this.confirmacionService.confirmAction('¿Estás seguro de que deseas proceder?', 'Confirmación');
    if (confirmed) {
      this.loading = true; // Mostrar spinner
      ////////////
      if (this.exerciseForm.valid) {
        this.ejercicioService.updateEjercicio(this.exerciseForm.value).subscribe(response => {
          alert('Ejercicio modificado exitosamente');
          this.isEditable = false;
          // Limpiar el formulario
          this.resetStatus();

        }, error => {
          // console.error('Error al modificar ejercicio', error);
          this.confirmacionService.showError('Error al modificar ejercicio');
        });
      }
      /////////////////
      setTimeout(() => {
        this.loading = false; // Ocultar spinner
        this.confirmacionService.showSuccess('Operación exitosa');
      }, 2000); // Simula un retraso de 2 segundos
    }
  }

  resetStatus(): void {
    this.exerciseForm.reset();
    window.scrollTo(0, 0);
    this.selectedGrupoMuscular = null;
    this.exerciseForm.controls['idGrupoMuscular'].setValue(null);
    this.obtenerGruposMusculares();
  }
}

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


@Component({
  selector: 'app-editar-ejercicio',
  imports: [CboGruposmuscularesComponent,
    CboEjercicioComponent, FormsModule,
    CommonModule, ReactiveFormsModule,
    ToastModule, ConfirmDialogModule,
    ProgressSpinnerModule],
  templateUrl: './editar-ejercicio.component.html',
  styleUrl: './editar-ejercicio.component.css'
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


  async onDelete() {
    const confirmed = await this.confirmacionService.confirmAction('¿Estás seguro de que deseas proceder?', 'Confirmación');
    
    if (confirmed) {
      this.loading = true; // Mostrar spinner
  
      // Log para depuración
      console.log('Ejercicio seleccionado:', this.selectedEjercicio);
  
      if (this.selectedEjercicio) {
        // Llamar al servicio para eliminar el ejercicio
        this.ejercicioService.deleteEjercicio(this.selectedEjercicio).subscribe(
          response => {
            // Si la respuesta es exitosa
            this.createForm(); // Recrear el formulario
            this.resetStatus(); // Limpiar el estado
  
            // Detener el spinner y mostrar mensaje de éxito
            this.loading = false;
            this.confirmacionService.showSuccess('Ejercicio eliminado exitosamente');
          },
          error => {
            // Si ocurre un error
            this.loading = false; // Detener el spinner
            console.error('Error al eliminar el ejercicio', error);
            this.confirmacionService.showError('Error al eliminar ejercicio');
          }
        );
      } else {
        // Si no hay un ejercicio seleccionado
        this.loading = false;
        this.confirmacionService.showError('No se ha seleccionado un ejercicio para eliminar');
      }
    }
  }
  

  async onUpdate() {
    const confirmed = await this.confirmacionService.confirmAction('¿Estás seguro de que deseas proceder?', 'Confirmación');
    
    if (confirmed) {
      this.loading = true; // Mostrar spinner
  
      // Log para depuración
      console.log(this.exerciseForm.value, 'ejercicio a actualizar');
  
      if (this.exerciseForm.valid) {
        // Llamar al servicio para actualizar el ejercicio
        this.ejercicioService.updateEjercicio(this.exerciseForm.value).subscribe(
          response => {
            // Si la respuesta es exitosa
            this.isEditable = false;
  
            // Limpiar el formulario
            this.resetStatus();
  
            // Detener el spinner y mostrar mensaje de éxito
            this.loading = false;
            this.confirmacionService.showSuccess('Operación exitosa');
          },
          error => {
            // Si ocurre un error
            this.loading = false; // Detener el spinner
            console.error('Error al actualizar el ejercicio', error);
            this.confirmacionService.showError('Error al modificar ejercicio');
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
    this.selectedGrupoMuscular = null;
    this.exerciseForm.controls['idGrupoMuscular'].setValue(null);
    this.obtenerGruposMusculares();
  }
}

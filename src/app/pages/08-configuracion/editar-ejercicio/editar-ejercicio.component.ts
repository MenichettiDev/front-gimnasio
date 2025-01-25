import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CboGruposmuscularesComponent } from '../../../components/cbo-gruposmusculares/cbo-gruposmusculares.component';
import { CboEjercicioComponent } from '../../../components/cbo-ejercicio/cbo-ejercicio.component';
import { GruposMuscularesService } from '../../../service/grupos-musculares.service';
import { EjerciciosService } from '../../../service/ejercicios.service';
import { SharedGrupoMuscularService } from '../../../service/shared-grupo-muscular.service';
import { CommonModule } from '@angular/common';
import { GrupoMuscular } from '../../../data/interfaces/grupoMuscularInterface';
import { Ejercicio } from '../../../data/interfaces/ejercicioInterface';

@Component({
  selector: 'app-editar-ejercicio',
  imports: [CboGruposmuscularesComponent, CboEjercicioComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './editar-ejercicio.component.html',
  styleUrls: ['./editar-ejercicio.component.css']
})
export class EditarEjercicioComponent implements OnInit {
  exerciseForm: FormGroup = new FormGroup({});
  selectedGrupoMuscular: number | null = null;
  selectedEjercicio: number | null = null;
  isEditable: boolean = false;
  gruposMusculares: GrupoMuscular[] = [];

  constructor(
    private fb: FormBuilder,
    private grupoMuscularService: GruposMuscularesService,
    private ejercicioService: EjerciciosService,
    private sharedGrupoMuscularService: SharedGrupoMuscularService
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

  onSubmit(): void {
    if (this.exerciseForm.valid) {
      this.ejercicioService.updateEjercicio(this.exerciseForm.value).subscribe(response => {
        alert('Ejercicio modificado exitosamente');
        this.isEditable = false;
        // Limpiar el formulario
        this.resetStatus();

      }, error => {
        console.error('Error al modificar ejercicio', error);
      });
    }
  }

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

  resetStatus(): void {
    this.exerciseForm.reset(); // Restablece todos los controles del formulario

    // Desplazar la pantalla hacia arriba
    window.scrollTo(0, 0); // Desplaza la pantalla hacia la parte superior

    // Restablecer el grupo muscular seleccionado
    this.selectedGrupoMuscular = null; // Limpia la selección del grupo muscular

    // Si tienes un control específico para el grupo muscular en el formulario, puedes restablecerlo así:
    this.exerciseForm.controls['idGrupoMuscular'].setValue(null); // Asegúrate de que el control tenga el nombre correcto

    // Si necesitas recargar los grupos musculares, puedes llamar a obtenerGruposMusculares() aquí
    this.obtenerGruposMusculares(); // Recargar grupos musculares
}
}

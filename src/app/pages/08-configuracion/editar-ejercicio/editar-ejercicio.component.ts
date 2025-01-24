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
  selectedGrupoMuscular: GrupoMuscular | null = null;
  selectedEjercicio: Ejercicio | null = null;
  isEditable: boolean = false;
  gruposMusculares: GrupoMuscular[] = [];

  constructor(
    private fb: FormBuilder,
    private grupoMuscularService: GruposMuscularesService,
    private ejercicioService: EjerciciosService,
    private sharedGrupoMuscularService: SharedGrupoMuscularService
  ) {}

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
      nombre: [''],
      img1: [''],
      img2: [''],
      img3: [''],
      descripcion: [''],
      linkVideo: ['']
    });
    this.exerciseForm.disable();
  }

  subscribeToGrupoMuscularChanges(): void {
    this.sharedGrupoMuscularService.selectedGrupo$.subscribe(grupo => {
      if (grupo) {
        this.selectedGrupoMuscular = grupo;
        this.exerciseForm.controls['idGrupoMuscular'].setValue(grupo.id_grupo_muscular);
        this.isEditable = true;
      }
    });
  }

  onGrupoMuscularChange(musculo: GrupoMuscular): void {
    if (musculo) {
      this.selectedGrupoMuscular = musculo;
      console.log('frupo muscular seleccionado: ' + musculo);
      this.exerciseForm.controls['idGrupoMuscular'].setValue(musculo.id_grupo_muscular);
      this.isEditable = true;
      this.sharedGrupoMuscularService.setSelectedGrupo(musculo);
    }
  }

  onEjercicioChange(ejercicio: Ejercicio): void {
    this.selectedEjercicio = ejercicio;

    this.ejercicioService.getEjercicioPorGrupoMuscular(ejercicio.id_grupo_muscular).subscribe(data => {
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
      }, error => {
        console.error('Error al modificar ejercicio', error);
      });
    }
  }

  onDelete(): void {
    if (this.selectedEjercicio) {
      this.ejercicioService.deleteEjercicio(this.selectedEjercicio.id_ejercicio).subscribe(response => {
        alert('Ejercicio eliminado exitosamente');
        this.createForm();
      }, error => {
        console.error('Error al eliminar ejercicio', error);
      });
    }
  }
}

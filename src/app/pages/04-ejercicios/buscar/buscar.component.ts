import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-buscar',
  imports: [CboGruposmuscularesComponent,
    CboEjercicioComponent, FormsModule,
    CommonModule, ReactiveFormsModule,
    ToastModule, ConfirmDialogModule,
    ProgressSpinnerModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit {
  loading: boolean = false;
  exerciseForm: FormGroup = new FormGroup({});
  selectedGrupoMuscular: number | null = null;
  selectedEjercicio: number | null = null;
  isEditable: boolean = false;
  gruposMusculares: GrupoMuscular[] = [];
  safeVideoUrl: SafeResourceUrl | null = null; // Variable para almacenar la URL sanitizada

  constructor(
    private fb: FormBuilder,
    private grupoMuscularService: GruposMuscularesService,
    private ejercicioService: EjerciciosService,
    private sharedGrupoMuscularService: SharedGrupoMuscularService,
    private confirmacionService: ConfirmacionService,
    private sanitizer: DomSanitizer
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
      id_ejercicio: [''],
      id_grupo_muscular: [''],
      nombre: [''],
      img_1: [''],
      img_2: [''],
      img_3: [''],
      descripcion: [''],
      link_video: ['']
    });
    // this.exerciseForm.disable();
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


  onBuscar(): void {
    if (!this.selectedEjercicio) {
      this.confirmacionService.showError('Debe seleccionar un ejercicio para buscar.');
      return;
    }

    this.loading = true;

    this.ejercicioService.getEjercicioById(this.selectedEjercicio).subscribe(
      (data) => {
        console.log('Ejercicio encontrado', data);
        this.exerciseForm.patchValue(data); // Actualiza el formulario con los datos del ejercicio
        this.exerciseForm.enable(); // Habilita el formulario si está deshabilitado
        this.loading = false;
      },
      (error) => {
        console.error('Error al buscar el ejercicio', error);
        this.loading = false;
        this.confirmacionService.showError('No se pudo cargar el ejercicio.');
      }
    );
  }


  resetStatus(): void {
    this.exerciseForm.reset();
    window.scrollTo(0, 0);
    this.selectedGrupoMuscular = null;
    this.exerciseForm.controls['idGrupoMuscular'].setValue(null);
    this.obtenerGruposMusculares();
  }

  // Método para sanitizar la URL del video
  getSafeUrl(url: string): SafeResourceUrl {
    // Verifica si la URL es de YouTube
    if (url.includes('youtube.com/watch?v=')) {
        console.log('URL original:', url); // Depuración
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get('v');
        console.log('ID del video extraído:', videoId); // Depuración
        if (videoId) {
            // Convierte la URL al formato de incrustación
            url = `https://www.youtube.com/embed/${videoId}`;
        }
    } else if (url.includes('youtu.be/')) {
        // Maneja URLs cortas de YouTube
        const videoId = url.split('youtu.be/')[1].split('?')[0];
        console.log('ID del video extraído (URL corta):', videoId); // Depuración
        if (videoId) {
            url = `https://www.youtube.com/embed/${videoId}`;
        }
    }

    // Sanitiza la URL para que Angular la permita en el iframe
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

}
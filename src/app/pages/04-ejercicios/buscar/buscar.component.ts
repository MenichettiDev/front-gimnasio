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
import { environment } from '../../../../environments/environment';

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
  private apiUrl = environment.apiEjercicios;
  loading: boolean = false;
  exerciseForm: FormGroup = new FormGroup({});
  selectedGrupoMuscular: number | null = null;
  selectedEjercicio: number | null = null;
  isEditable: boolean = false;
  gruposMusculares: GrupoMuscular[] = [];
  safeVideoUrl: SafeResourceUrl | null = null;

  // Add modal properties
  showModal: boolean = false;
  selectedImage: string = '';
  selectedImageTitle: string = '';

  constructor(
    private fb: FormBuilder,
    private grupoMuscularService: GruposMuscularesService,
    private ejercicioService: EjerciciosService,
    private sharedGrupoMuscularService: SharedGrupoMuscularService,
    private confirmacionService: ConfirmacionService,
    private sanitizer: DomSanitizer
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

      // Load existing images
      this.loadExerciseImagesUsingPublicUrl(id_ejercicio, this.apiUrl);
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
        this.exerciseForm.patchValue(data); // Actualiza el formulario con los datos del ejercicio
        this.exerciseForm.enable(); // Habilita el formulario si está deshabilitado

        // Load existing images
        this.loadExerciseImagesUsingPublicUrl(this.selectedEjercicio!, this.apiUrl);

        this.loading = false;
      },
      (error) => {
        console.error('Error al buscar el ejercicio', error);
        this.loading = false;
        this.confirmacionService.showError('No se pudo cargar el ejercicio.');
      }
    );
  }

  private loadExerciseImagesUsingPublicUrl(id_ejercicio: number, baseBackendUrl: string): void {
    const imageFields = ['img_1', 'img_2', 'img_3'];

    imageFields.forEach(field => {
      const relPath = this.exerciseForm.get(field)?.value; // "Ejercicios/1/123/img_1.jpg"
      if (relPath) {
        // normalizar para evitar doble slash
        const trimmed = relPath.replace(/^\/+/, '');
        const url = `${baseBackendUrl.replace(/\/+$/, '')}/${trimmed}`;
        this.exerciseForm.get(field)?.setValue(url); // o guarda en otra variable para <img [src]="...">
      }
    });
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
      const urlParams = new URLSearchParams(new URL(url).search);
      const videoId = urlParams.get('v');
      if (videoId) {
        // Convierte la URL al formato de incrustación
        url = `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (url.includes('youtu.be/')) {
      // Maneja URLs cortas de YouTube
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      if (videoId) {
        url = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Sanitiza la URL para que Angular la permita en el iframe
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Add modal methods
  openImageModal(imageUrl: string, imageTitle: string): void {
    if (imageUrl && imageUrl !== 'images/rat.jpeg') {
      this.selectedImage = imageUrl;
      this.selectedImageTitle = imageTitle;
      this.showModal = true;
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedImage = '';
    this.selectedImageTitle = '';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  // Close modal when clicking outside the image
  onModalBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

}
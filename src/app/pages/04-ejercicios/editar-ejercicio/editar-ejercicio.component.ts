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
import { environment } from '../../../../environments/environment';


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
  private apiUrl = environment.apiEjercicios;
  loading: boolean = false;
  exerciseForm: FormGroup = new FormGroup({});
  selectedGrupoMuscular: number | null = null;
  selectedEjercicio: number | null = null;
  isEditable: boolean = false;
  gruposMusculares: GrupoMuscular[] = [];

  // Add drag and drop properties
  dragOver = false;
  imageErrors: { [key: string]: string } = {};
  imageSuccess: { [key: string]: string } = {};
  private imageFiles: { [key: string]: File | null } = {
    img_1: null,
    img_2: null,
    img_3: null
  };

  // Add standard image dimensions
  private readonly STANDARD_WIDTH = 800;
  private readonly STANDARD_HEIGHT = 600;

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

  // Drag and drop methods
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
  }

  async onDrop(event: DragEvent, fieldName: string) {
    event.preventDefault();
    this.dragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      await this.processAndValidateImage(file, fieldName);
    }
  }

  async onFileSelected(event: Event, fieldName: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      await this.processAndValidateImage(file, fieldName);
    }
  }

  triggerFileInput(inputId: string) {
    const input = document.querySelector(`#${inputId}`) as HTMLInputElement;
    input?.click();
  }

  removeImage(fieldName: string) {
    this.exerciseForm.get(fieldName)?.setValue('');
    this.imageFiles[fieldName] = null;
    this.imageErrors[fieldName] = '';
    this.imageSuccess[fieldName] = '';
  }

  // Image processing method with standard dimensions
  private processAndValidateImage(file: File, fieldName: string): Promise<boolean> {
    return new Promise((resolve) => {
      // Clear previous messages
      this.imageErrors[fieldName] = '';
      this.imageSuccess[fieldName] = '';

      // Validate file type (only JPG/PNG)
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type.toLowerCase())) {
        this.imageErrors[fieldName] = 'Solo se permiten archivos JPG y PNG';
        resolve(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        // Create canvas with standard dimensions
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          this.imageErrors[fieldName] = 'Error al procesar la imagen';
          resolve(false);
          return;
        }

        // Set canvas to standard size
        canvas.width = this.STANDARD_WIDTH;
        canvas.height = this.STANDARD_HEIGHT;

        // Calculate scaling and positioning to maintain aspect ratio
        const imgAspectRatio = img.width / img.height;
        const canvasAspectRatio = this.STANDARD_WIDTH / this.STANDARD_HEIGHT;

        let drawWidth = this.STANDARD_WIDTH;
        let drawHeight = this.STANDARD_HEIGHT;
        let offsetX = 0;
        let offsetY = 0;

        if (imgAspectRatio > canvasAspectRatio) {
          // Image is wider - fit by height and center horizontally
          drawWidth = this.STANDARD_HEIGHT * imgAspectRatio;
          offsetX = (this.STANDARD_WIDTH - drawWidth) / 2;
        } else {
          // Image is taller - fit by width and center vertically
          drawHeight = this.STANDARD_WIDTH / imgAspectRatio;
          offsetY = (this.STANDARD_HEIGHT - drawHeight) / 2;
        }

        // Fill with white background first
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, this.STANDARD_WIDTH, this.STANDARD_HEIGHT);

        // Draw image centered and scaled
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        // Compress to target size
        this.compressImageToTarget(canvas, fieldName, resolve);

        URL.revokeObjectURL(img.src);
      };

      img.onerror = () => {
        this.imageErrors[fieldName] = 'Error al cargar la imagen';
        URL.revokeObjectURL(img.src);
        resolve(false);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  private compressImageToTarget(canvas: HTMLCanvasElement, fieldName: string, resolve: (value: boolean) => void) {
    const targetMinSize = 100 * 1024; // 100KB
    const targetMaxSize = 250 * 1024; // 250KB

    let quality = 0.9;
    let attempts = 0;
    const maxAttempts = 10;

    const tryCompress = () => {
      canvas.toBlob((blob) => {
        if (!blob) {
          this.imageErrors[fieldName] = 'Error al comprimir la imagen';
          resolve(false);
          return;
        }

        attempts++;

        if (blob.size >= targetMinSize && blob.size <= targetMaxSize) {
          // Convert blob to file and store
          const file = new File([blob], `${fieldName}.jpg`, { type: 'image/jpeg' });
          this.imageFiles[fieldName] = file;

          // Create preview URL for display
          const reader = new FileReader();
          reader.onload = (e) => {
            this.exerciseForm.get(fieldName)?.setValue(e.target?.result);
            this.imageSuccess[fieldName] = `✓ Imagen estandarizada (${this.STANDARD_WIDTH}x${this.STANDARD_HEIGHT}px, ${Math.round(blob.size / 1024)} KB)`;
            resolve(true);
          };
          reader.readAsDataURL(blob);
        } else if (blob.size > targetMaxSize && attempts < maxAttempts) {
          // Too large - reduce quality
          quality -= 0.1;
          if (quality < 0.1) quality = 0.1;
          tryCompress();
        } else if (blob.size < targetMinSize && attempts < maxAttempts) {
          // Too small - increase quality
          quality += 0.1;
          if (quality > 1.0) quality = 1.0;
          tryCompress();
        } else {
          // Couldn't achieve target size after max attempts
          const file = new File([blob], `${fieldName}.jpg`, { type: 'image/jpeg' });
          this.imageFiles[fieldName] = file;

          const reader = new FileReader();
          reader.onload = (e) => {
            this.exerciseForm.get(fieldName)?.setValue(e.target?.result);
            this.imageSuccess[fieldName] = `✓ Imagen procesada (${this.STANDARD_WIDTH}x${this.STANDARD_HEIGHT}px, ${Math.round(blob.size / 1024)} KB)`;
            resolve(true);
          };
          reader.readAsDataURL(blob);
        }
      }, 'image/jpeg', quality);
    };

    tryCompress();
  }

  resetStatus(): void {
    this.exerciseForm.reset();
    // Clear image files
    this.imageFiles = {
      img_1: null,
      img_2: null,
      img_3: null
    };
    // Clear validation messages
    this.imageErrors = {};
    this.imageSuccess = {};
    window.scrollTo(0, 0);
    this.selectedGrupoMuscular = null;
    this.exerciseForm.controls['idGrupoMuscular'].setValue(null);
    this.obtenerGruposMusculares();
  }


  async onDelete() {
    const confirmed = await this.confirmacionService.confirmAction('¿Estás seguro de que deseas proceder?', 'Confirmación');

    if (confirmed) {
      this.loading = true; // Mostrar spinner

      // Log para depuración

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

}

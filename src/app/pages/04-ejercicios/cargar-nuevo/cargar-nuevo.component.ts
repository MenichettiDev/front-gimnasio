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

  dragOver = false;

  // Add these properties for image validation
  imageErrors: { [key: string]: string } = {};
  imageSuccess: { [key: string]: string } = {};

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

  // Add the image validation method
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
        // Create canvas for resizing and compression
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          this.imageErrors[fieldName] = 'Error al procesar la imagen';
          resolve(false);
          return;
        }

        // Calculate new dimensions (width between 800-1200px)
        let newWidth = img.width;
        let newHeight = img.height;

        if (newWidth < 800) {
          const scale = 800 / newWidth;
          newWidth = 800;
          newHeight = Math.round(newHeight * scale);
        } else if (newWidth > 1200) {
          const scale = 1200 / newWidth;
          newWidth = 1200;
          newHeight = Math.round(newHeight * scale);
        }

        // Set canvas size
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw resized image
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Try different quality levels to get file size between 100-250KB
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
          // Perfect size - convert to base64 and set
          const reader = new FileReader();
          reader.onload = (e) => {
            this.exerciseForm.get(fieldName)?.setValue(e.target?.result);
            this.imageSuccess[fieldName] = `✓ Imagen adaptada (${canvas.width}x${canvas.height}px, ${Math.round(blob.size / 1024)} KB)`;
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
          const reader = new FileReader();
          reader.onload = (e) => {
            this.exerciseForm.get(fieldName)?.setValue(e.target?.result);
            this.imageSuccess[fieldName] = `✓ Imagen procesada (${canvas.width}x${canvas.height}px, ${Math.round(blob.size / 1024)} KB)`;
            resolve(true);
          };
          reader.readAsDataURL(blob);
        }
      }, 'image/jpeg', quality);
    };

    tryCompress();
  }
}

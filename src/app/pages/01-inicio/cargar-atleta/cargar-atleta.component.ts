import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CboGimnasioComponent } from '../../../components/cbo-gimnasio/cbo-gimnasio.component';
import { ModalConfirmComponent } from '../../../components/modal/modal-confirm/modal-confirm.component';
import { AuthService } from '../../../service/auth/auth.service';
import { EntrenadorService } from '../../../service/entrenador.service';
import { AtletaService } from '../../../service/atleta.service';
import { Persona } from '../../../data/interfaces/tbPersonaInterface';

@Component({
  selector: 'app-cargar-atleta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CboGimnasioComponent, ModalConfirmComponent],
  templateUrl: './cargar-atleta.component.html',
  styleUrls: ['./cargar-atleta.component.css']
})
export class CargarAtletaComponent implements OnInit {
  atletaForm!: FormGroup;
  id_persona: number | null = null;
  isModalVisible: boolean = false; // Controla la visibilidad del modal

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private entrenadorService: EntrenadorService,
    private atletaService: AtletaService
  ) {}

  ngOnInit(): void {
    this.id_persona = this.authService.getIdPersona(); // Obtenemos el usuario actual
    // console.log('Usuario actual:', this.id_persona);

    this.atletaForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', Validators.required],
      apodo: [''],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      celular: [''],
      direccion: [''],
      email: ['', [Validators.required, Validators.email]],
      id_gimnasio: [null],
      // foto_archivo: [''],
    });
  }

  // Mostrar el modal de confirmación
  openModal(): void {
    if (this.atletaForm.valid) {
      this.isModalVisible = true; // Muestra el modal si el formulario es válido
    } else {
      console.error('El formulario no es válido');
    }
  }

  // Manejar la confirmación del modal
  handleConfirm(): void {
    if (!this.id_persona ) {
      console.error('El ID del usuario no está disponible');
      return;
    }

    const atletaData = this.atletaForm.value;

    this.entrenadorService.getEntrenadorById(this.id_persona).subscribe({
      next: (data) => {
        atletaData.id_entrenador = data.id_entrenador;

        // Crear atleta
        this.atletaService.crearAtleta(atletaData).subscribe({
          next: (response) => {
            console.log('Atleta creado:', response);
            this.isModalVisible = false; // Cierra el modal
          },
          error: (err) => {
            console.error('Error al crear atleta:', err);
            this.isModalVisible = false; // Cierra el modal en caso de error
          },
        });
      },
      error: (err) => {
        console.error('Error al obtener el entrenador:', err);
        this.isModalVisible = false; // Cierra el modal en caso de error
      },
    });
  }

  // Manejar la cancelación del modal
  handleCancel(): void {
    this.isModalVisible = false; // Cierra el modal
  }
}

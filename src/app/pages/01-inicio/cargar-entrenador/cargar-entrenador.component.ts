import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalConfirmComponent } from '../../../components/modal/modal-confirm/modal-confirm.component';
import { AuthService } from '../../../service/auth/auth.service';
import { EntrenadorService } from '../../../service/entrenador.service';
import { CboGimnasioComponent } from "../../../components/cbo-gimnasio/cbo-gimnasio.component";
import { GimnasioService } from '../../../service/gimnasio.service';
import { CboGimnasiosMultiplesComponent } from "../../../components/Gimnasios/cbo-gimnasios-multiples/cbo-gimnasios-multiples.component";

@Component({
  selector: 'app-cargar-entrenador',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalConfirmComponent, CboGimnasioComponent, CboGimnasiosMultiplesComponent],
  templateUrl: './cargar-entrenador.component.html',
  styleUrls: ['./cargar-entrenador.component.css']
})
export class CargarEntrenadorComponent implements OnInit {
  frmData!: FormGroup;
  id_persona: number | null = null;
  isModalVisible: boolean = false; // Controla la visibilidad del modal
  gimnasios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private entrenadorService: EntrenadorService,
    private gimnasioService: GimnasioService
  ) {
    this.frmData = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', Validators.required],
      apodo: [''],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      celular: [''],
      direccion: [''],
      email: ['', [Validators.required, Validators.email]],
      fecha_ingreso: ['', Validators.required],
      gimnasios: [[]],
    });
  }

  ngOnInit(): void {
    this.id_persona = this.authService.getIdPersona(); // Obtenemos el usuario actual
    // console.log('Usuario actual:', this.id_persona);





    this.gimnasioService.getGimnasios().subscribe(data => {
      this.gimnasios = data;
    });


  }

  // Mostrar el modal de confirmación
  openModal(): void {
    if (this.frmData.valid) {
      this.isModalVisible = true; // Muestra el modal si el formulario es válido
    } else {
      console.error('El formulario no es válido');
    }
  }

  // Manejar la confirmación del modal
  handleConfirm(): void {
    if (!this.id_persona) {
      console.error('El ID del usuario no está disponible');
      return;
    }

    const entrenadorData = this.frmData.value;

    // Crear entrenador
    this.entrenadorService.crearEntrenador(entrenadorData).subscribe({
      next: (response) => {
        console.log('Entrenador creado:', response);
        alert('Entrenador creado exitosamente!'); // Mensaje de éxito
        this.isModalVisible = false; // Cierra el modal
      },
      error: (err) => {
        // console.error('Error al crear entrenador:', err);
        alert('Error al crear entrenador: ' + err.error.message); // Mensaje de error
        this.isModalVisible = false; // Cierra el modal en caso de error
      },
    });
  }

  // Manejar la cancelación del modal
  handleCancel(): void {
    this.isModalVisible = false; // Cierra el modal
  }
}
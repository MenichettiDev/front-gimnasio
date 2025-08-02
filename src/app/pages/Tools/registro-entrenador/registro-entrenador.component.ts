import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from '../../../components/modal/modal-confirm/modal-confirm.component';
import { AuthService } from '../../../service/auth/auth.service';
import { EntrenadorService } from '../../../service/entrenador.service';
import { PersonaService } from '../../../service/persona.service';
import { CboGimnasiosMultiplesComponent } from "../../../components/Gimnasios/cbo-gimnasios-multiples/cbo-gimnasios-multiples.component";

@Component({
  selector: 'app-registro-entrenador',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalConfirmComponent],
  templateUrl: './registro-entrenador.component.html',
  styleUrls: ['./registro-entrenador.component.css']
})
export class RegistroEntrenadorComponent implements OnInit {
  frmData!: FormGroup;
  isModalVisible: boolean = false;
  showTerminos: boolean = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private entrenadorService: EntrenadorService,
    private personaService: PersonaService,
    private router: Router
  ) {
    this.frmData = this.fb.group({
      // Datos de Persona
      dni: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      apodo: [''],
      fecha_nacimiento: ['', Validators.required],
      celular: ['', [Validators.required, Validators.minLength(10)]],
      direccion: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      // Datos específicos de Entrenador
      fecha_ingreso: ['', Validators.required],
      gimnasios: [[]],
      acepta_terminos: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.frmData = this.fb.group({
      // Datos de Persona
      dni: ['', [Validators.required, Validators.minLength(8), this.dniValidator]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      apodo: [''],
      fecha_nacimiento: ['', [Validators.required, this.dateValidator]],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      direccion: [''],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      // Datos específicos de Entrenador
      fecha_ingreso: ['', Validators.required],
      gimnasios: [[]],
      acepta_terminos: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });

    // Establecer fecha de ingreso como hoy por defecto
    const today = new Date().toISOString().split('T')[0];
    this.frmData.patchValue({
      fecha_ingreso: today
    });
  }

  // Validador de fecha (no puede ser futura para fecha de nacimiento)
  dateValidator = (control: any) => {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate > today) {
      return { futureDate: true };
    }

    // Validar que sea mayor de edad (18 años)
    const age = today.getFullYear() - selectedDate.getFullYear();
    if (age < 18) {
      return { underAge: true };
    }

    return null;
  };

  // Actualizar el método de errores
  getFieldError(fieldName: string): string {
    const field = this.frmData.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['email']) return 'Ingrese un email válido';
      if (field.errors['invalidEmail']) return 'Formato de email inválido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['invalidDni']) return 'DNI debe tener entre 8 y 10 dígitos';
      if (field.errors['pattern']) return 'Formato inválido';
      if (field.errors['passwordMismatch']) return 'Las contraseñas no coinciden';
      if (field.errors['futureDate']) return 'La fecha no puede ser futura';
      if (field.errors['underAge']) return 'Debe ser mayor de 18 años';
    }
    return '';
  }

  // Validador personalizado para confirmar contraseña
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirm_password');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  // Verificar si un campo es inválido
  isFieldInvalid(fieldName: string): boolean {
    const field = this.frmData.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }



  // Mostrar el modal de confirmación
  openModal(): void {
    if (this.frmData.valid) {
      this.isModalVisible = true;
    } else {
      this.markFormGroupTouched(this.frmData);
    }
  }

  // Marcar todos los campos como tocados
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  // Manejar la confirmación del modal
  handleConfirm(): void {
    if (this.frmData.valid) {
      this.registrarEntrenador();
    }
    this.isModalVisible = false;
  }

  // Manejar la cancelación del modal
  handleCancel(): void {
    this.isModalVisible = false;
  }


  // Registrar entrenador (método actualizado)
  private registrarEntrenador(): void {
    const formValue = this.frmData.value;

    // Preparar todos los datos en un solo objeto
    const entrenadorData = {
      // Datos de persona
      dni: formValue.dni,
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      apodo: formValue.apodo || null,
      fecha_nacimiento: formValue.fecha_nacimiento,
      celular: formValue.celular,
      direccion: formValue.direccion || null,
      email: formValue.email,
      password: formValue.password, // El backend ya hashea la contraseña
      // Datos específicos de entrenador
      fecha_ingreso: formValue.fecha_ingreso,
      gimnasios: [] // Array de IDs de gimnasios
    };

    // Enviar todo junto al backend
    this.entrenadorService.crearEntrenador(entrenadorData).subscribe({
      next: (response) => {

        // Preparar datos del usuario para la sesión
        const userData = {
          id_persona: response.id_persona,
          id_acceso: 2, // Entrenador
          nombre: formValue.nombre,
          apellido: formValue.apellido,
          email: formValue.email,
          id_entrenador: response.id_entrenador,
          // Agregar otros campos que necesites en la sesión
          dni: formValue.dni,
          apodo: formValue.apodo
        };

        // Guardar usuario en sesión
        this.authService.saveUser(userData);

        alert('¡Registro exitoso! Bienvenido al sistema.');
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        console.error('Error al registrar entrenador:', error);

        // Manejo de errores específicos
        let errorMessage = 'Error al registrar entrenador.';

        if (error.status === 400) {
          errorMessage = 'Datos inválidos. Verifique la información ingresada.';
        } else if (error.status === 409) {
          errorMessage = 'El DNI o email ya están registrados.';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor. Intente más tarde.';
        }

        alert(errorMessage);
      }
    });
  }


  // Volver al modal de selección de perfil
  volverASeleccion(): void {
    this.router.navigate(['/seleccionar-perfil']);
  }

  // Validador personalizado para DNI único (opcional)
  dniValidator = (control: any) => {
    const dni = control.value;
    if (!dni) return null;

    // Aquí podrías hacer una verificación async al backend
    // Por ahora solo validamos el formato
    if (!/^\d{8,10}$/.test(dni)) {
      return { invalidDni: true };
    }

    return null;
  };

  // Validador personalizado para email único (opcional)
  emailValidator = (control: any) => {
    const email = control.value;
    if (!email) return null;

    // Validación básica de formato
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return { invalidEmail: true };
    }

    return null;
  };
}
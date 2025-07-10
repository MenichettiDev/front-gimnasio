import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CboGimnasioComponent } from '../../../components/cbo-gimnasio/cbo-gimnasio.component';
import { ModalConfirmComponent } from '../../../components/modal/modal-confirm/modal-confirm.component';
import { AuthService } from '../../../service/auth/auth.service';
import { AtletaService } from '../../../service/atleta.service';

@Component({
  selector: 'app-registro-atleta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CboGimnasioComponent, ModalConfirmComponent],
  templateUrl: './registro-atleta.component.html',
  styleUrls: ['./registro-atleta.component.css']
})
export class RegistroAtletaComponent implements OnInit {
  atletaForm!: FormGroup;
  isModalVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private atletaService: AtletaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.atletaForm = this.fb.group({
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
      // Datos específicos de Atleta
      id_gimnasio: [null], // Opcional
      acepta_terminos: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validadores (reutilizados del registro de entrenador)
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirm_password');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  dniValidator = (control: any) => {
    const dni = control.value;
    if (!dni) return null;

    if (!/^\d{8,10}$/.test(dni)) {
      return { invalidDni: true };
    }

    return null;
  };

  emailValidator = (control: any) => {
    const email = control.value;
    if (!email) return null;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return { invalidEmail: true };
    }

    return null;
  };

  dateValidator = (control: any) => {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate > today) {
      return { futureDate: true };
    }

    // Validar que sea mayor de edad (16 años para atletas)
    const age = today.getFullYear() - selectedDate.getFullYear();
    if (age < 16) {
      return { underAge: true };
    }

    return null;
  };

  // Verificar si un campo es inválido
  isFieldInvalid(fieldName: string): boolean {
    const field = this.atletaForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Obtener mensaje de error para un campo
  getFieldError(fieldName: string): string {
    const field = this.atletaForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['email']) return 'Ingrese un email válido';
      if (field.errors['invalidEmail']) return 'Formato de email inválido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['invalidDni']) return 'DNI debe tener entre 8 y 10 dígitos';
      if (field.errors['pattern']) return 'Formato inválido';
      if (field.errors['passwordMismatch']) return 'Las contraseñas no coinciden';
      if (field.errors['futureDate']) return 'La fecha no puede ser futura';
      if (field.errors['underAge']) return 'Debe ser mayor de 16 años';
    }
    return '';
  }

  // Mostrar el modal de confirmación
  openModal(): void {
    if (this.atletaForm.valid) {
      this.isModalVisible = true;
    } else {
      this.markFormGroupTouched(this.atletaForm);
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
    if (this.atletaForm.valid) {
      this.registrarAtleta();
    }
    this.isModalVisible = false;
  }

  // Manejar la cancelación del modal
  handleCancel(): void {
    this.isModalVisible = false;
  }

  // Registrar atleta
  private registrarAtleta(): void {
    const formValue = this.atletaForm.value;

    // Preparar todos los datos en un solo objeto
    const atletaData = {
      // Datos de persona
      dni: formValue.dni,
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      apodo: formValue.apodo || null,
      fecha_nacimiento: formValue.fecha_nacimiento,
      celular: formValue.celular,
      direccion: formValue.direccion || null,
      email: formValue.email,
      password: formValue.password,
      // Datos específicos de atleta
      id_entrenador: null, // Por defecto null, se puede asignar después
      id_gimnasio: formValue.id_gimnasio || null
    };

    // Enviar todo junto al backend
    this.atletaService.crearAtleta(atletaData).subscribe({
      next: (response) => {
        console.log('Atleta registrado:', response);

        // Preparar datos del usuario para la sesión
        const userData = {
          id_persona: response.id_persona,
          id_acceso: 3, // Atleta
          nombre: formValue.nombre,
          apellido: formValue.apellido,
          email: formValue.email,
          id_atleta: response.id_atleta,
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
        console.error('Error al registrar atleta:', error);

        // Manejo de errores específicos
        let errorMessage = 'Error al registrar atleta.';

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
}
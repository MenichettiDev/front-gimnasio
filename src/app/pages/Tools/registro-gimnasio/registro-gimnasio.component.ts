import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalConfirmComponent } from '../../../components/modal/modal-confirm/modal-confirm.component';
import { AuthService } from '../../../service/auth/auth.service';
import { GimnasioService } from '../../../service/gimnasio.service';

@Component({
  selector: 'app-registro-gimnasio',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalConfirmComponent],
  templateUrl: './registro-gimnasio.component.html',
  styleUrls: ['./registro-gimnasio.component.css']
})
export class RegistroGimnasioComponent implements OnInit {
  gimnasioForm!: FormGroup;
  isModalVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private gimnasioService: GimnasioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.gimnasioForm = this.fb.group({
      // Datos de Persona (representante legal)
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
      // Datos específicos del Gimnasio
      nombre_gimnasio: ['', [Validators.required, Validators.minLength(3)]],
      direccion_gimnasio: ['', [Validators.required, Validators.minLength(10)]],
      telefono: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
      horario_apertura: ['', Validators.required],
      horario_cierre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      pagina_web: [''],
      acepta_terminos: [false, Validators.requiredTrue]
    }, {
      validators: [this.passwordMatchValidator, this.horarioValidator]
    });
  }

  // Validadores
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirm_password');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  horarioValidator(form: FormGroup) {
    const apertura = form.get('horario_apertura');
    const cierre = form.get('horario_cierre');

    if (apertura && cierre && apertura.value && cierre.value) {
      if (apertura.value >= cierre.value) {
        cierre.setErrors({ horarioInvalido: true });
        return { horarioInvalido: true };
      }
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

  urlValidator = (control: any) => {
    const url = control.value;
    if (!url) return null; // Campo opcional

    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      return { invalidUrl: true };
    }

    return null;
  };

  dateValidator = (control: any) => {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate > today) {
      return { futureDate: true };
    }

    // Validar que sea mayor de edad (18 años para representante legal)
    const age = today.getFullYear() - selectedDate.getFullYear();
    if (age < 18) {
      return { underAge: true };
    }

    return null;
  };

  // Verificar si un campo es inválido
  isFieldInvalid(fieldName: string): boolean {
    const field = this.gimnasioForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Obtener mensaje de error para un campo
  getFieldError(fieldName: string): string {
    const field = this.gimnasioForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['email']) return 'Ingrese un email válido';
      if (field.errors['invalidEmail']) return 'Formato de email inválido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['invalidDni']) return 'DNI debe tener entre 8 y 10 dígitos';
      if (field.errors['pattern']) return 'Formato inválido';
      if (field.errors['passwordMismatch']) return 'Las contraseñas no coinciden';
      if (field.errors['futureDate']) return 'La fecha no puede ser futura';
      if (field.errors['underAge']) return 'El representante debe ser mayor de 18 años';
      if (field.errors['invalidUrl']) return 'URL inválida';
      if (field.errors['horarioInvalido']) return 'El horario de cierre debe ser posterior al de apertura';
    }
    return '';
  }

  // Mostrar el modal de confirmación
  openModal(): void {
    if (this.gimnasioForm.valid) {
      this.isModalVisible = true;
    } else {
      this.markFormGroupTouched(this.gimnasioForm);
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
    if (this.gimnasioForm.valid) {
      this.registrarGimnasio();
    }
    this.isModalVisible = false;
  }

  // Manejar la cancelación del modal
  handleCancel(): void {
    this.isModalVisible = false;
  }

  // Registrar gimnasio
  private registrarGimnasio(): void {
    const formValue = this.gimnasioForm.value;

    // Preparar todos los datos según lo que espera el backend
    const gimnasioData = {
      // Datos de persona (representante legal)
      dni: formValue.dni,
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      apodo: formValue.apodo || null,
      fecha_nacimiento: formValue.fecha_nacimiento,
      celular: formValue.celular,
      direccion: formValue.direccion || null,
      email: formValue.email,
      password: formValue.password,
      // Datos específicos del gimnasio
      nombre_gimnasio: formValue.nombre_gimnasio,
      direccion_gimnasio: formValue.direccion_gimnasio,
      telefono: formValue.telefono,
      horario_apertura: formValue.horario_apertura,
      horario_cierre: formValue.horario_cierre,
      descripcion: formValue.descripcion,
      pagina_web: formValue.pagina_web || null,
      ultimo_pago: null // Se puede asignar después
    };

    // Enviar todo junto al backend
    this.gimnasioService.crearGimnasio(gimnasioData).subscribe({
      next: (response) => {
        console.log('Gimnasio registrado:', response);

        // Preparar datos del usuario para la sesión
        const userData = {
          id_persona: response.id_persona,
          id_acceso: 4, // Gimnasio
          nombre: formValue.nombre,
          apellido: formValue.apellido,
          email: formValue.email,
          id_gimnasio: response.id_gimnasio,
          // Agregar otros campos que necesites en la sesión
          dni: formValue.dni,
          nombre_gimnasio: formValue.nombre_gimnasio
        };

        // Guardar usuario en sesión
        this.authService.saveUser(userData);

        alert('¡Registro exitoso! Bienvenido al sistema.');
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        console.error('Error al registrar gimnasio:', error);

        // Manejo de errores específicos
        let errorMessage = 'Error al registrar gimnasio.';

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
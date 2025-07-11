import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CboAtletaComponent } from "../../../components/cbo-atleta/cbo-atleta.component";
import { CboMembresiaComponent } from "../../../components/cbo-membresia/cbo-membresia.component";
import { EntrenadorService } from '../../../service/entrenador.service';
import { AtletaService } from '../../../service/atleta.service';
import { AuthService } from '../../../service/auth/auth.service';
import { CboGimnasioComponent } from "../../../components/cbo-gimnasio/cbo-gimnasio.component";
import { Membresia } from '../../../data/interfaces/membresiaInterface';
import { MembresiaService } from '../../../service/membresia.service';
import { CommonModule } from '@angular/common';
import { Atleta } from '../../../data/interfaces/atletaInterface';
import { GimnasioService } from '../../../service/gimnasio.service';
import { CboFormasPagoComponent } from "../../../components/cbo-forma-pago/cbo-forma-pago.component";
import { PagoService } from '../../../service/pago.service';
import { ModalConfirmComponent } from '../../../components/modal/modal-confirm/modal-confirm.component';
import { Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-cargar-pago',
  imports: [ReactiveFormsModule, CommonModule, CboFormasPagoComponent, ModalConfirmComponent],
  templateUrl: './cargar-pago.component.html',
  styleUrl: './cargar-pago.component.css'
})
export class CargarPagoComponent implements OnInit {
  @Input() id!: number;
  @Input() tipo!: 'atleta' | 'entrenador' | 'gimnasio';

  montoFijo: number = 0;
  conceptoFijo: string = '';

  id_entrenador: number | null = null;
  id_gimnasio: number | null = null;
  isModalVisible: boolean = false; // Controla la visibilidad del modal
  gimnasioAtleta: string | null = null;
  frmData: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private pagoService: PagoService
  ) {
    this.frmData = this.fb.group({
      id_atleta: [null],
      id_entrenador: [null],
      id_gimnasio: [null],
      fecha_pago: [this.getFechaActual(), Validators.required],
      monto: [{ value: null, disabled: true }, Validators.required],
      concepto: [{ value: null, disabled: true }, Validators.required],
      id_forma_pago: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.setConceptoYMonto();
  }


  setConceptoYMonto(): void {
    console.log('Usuario:', this.authService.getUser());
    console.log('isGimnasio:', this.authService.isGimnasio());
    console.log('isEntrenador:', this.authService.isEntrenador());
    console.log('isAtleta:', this.authService.isAtleta());

    const user = this.authService.getUser();

    if (this.authService.isGimnasio()) {
      this.montoFijo = 20000;
      this.conceptoFijo = 'Pago membresía gimnasio';
      this.id = user?.id_gimnasio || null;
      this.tipo = 'gimnasio';
    } else if (this.authService.isEntrenador()) {
      this.montoFijo = 2000;
      this.conceptoFijo = 'Pago de entrenador';
      this.id = user?.id_entrenador || null;
      this.tipo = 'entrenador';
    } else if (this.authService.isAtleta()) {
      this.montoFijo = 500;
      this.conceptoFijo = 'Pago de atleta';
      this.id = user?.id_atleta || null; // Corregir: usar id_atleta en lugar de id_entrenador
      this.tipo = 'atleta';
    } else {
      this.montoFijo = 0;
      this.conceptoFijo = '';
    }

    // Llamar a setFormValues para configurar correctamente todos los campos
    this.setFormValues();
  }

  setFormValues(): void {
    this.frmData.patchValue({
      monto: this.montoFijo,
      concepto: this.conceptoFijo,
      fecha_pago: this.getFechaActual(),
      id_atleta: this.tipo === 'atleta' ? this.id : null,
      id_entrenador: this.tipo === 'entrenador' ? this.id : null,
      id_gimnasio: this.tipo === 'gimnasio' ? this.id : null,
    });
  }

  // Maneja el cambio de forma de pago
  onFormaPagoChange(idFormaPago: number): void {
    console.log('Forma de pago seleccionada:', idFormaPago);
    this.frmData.get('id_forma_pago')?.setValue(idFormaPago); // Actualiza el control 'forma_pago'
  }

  // Enviar el formulario
  onSubmit(): void {
    if (this.frmData.invalid) {
      console.warn('El formulario es inválido.');
      return;
    }

    // Llamar al modal de confirmación
    this.openModal();
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
    if (!this.id) {
      console.error('El ID no está disponible');
      return;
    }

    // Preparar los datos correctamente usando getRawValue() para incluir campos deshabilitados
    const formData = {
      id_atleta: this.frmData.get('id_atleta')?.value,
      id_entrenador: this.frmData.get('id_entrenador')?.value,
      id_gimnasio: this.frmData.get('id_gimnasio')?.value,
      fecha_pago: this.frmData.get('fecha_pago')?.value,
      monto: this.montoFijo, // Usar el valor fijo ya que el campo está deshabilitado
      concepto: this.conceptoFijo, // Usar el valor fijo ya que el campo está deshabilitado
      id_forma_pago: this.frmData.get('id_forma_pago')?.value
    };

    console.log('Datos a enviar:', formData);

    // Crear el pago
    this.pagoService.createPago(formData).subscribe({
      next: (response) => {
        console.log('Pago creado exitosamente:', response);
        alert('Pago registrado correctamente');
        this.frmData.reset();
        this.setConceptoYMonto(); // Restablecer valores después del reset
        this.isModalVisible = false;
      },
      error: (error) => {
        console.error('Error al crear el pago:', error);
        alert('Ocurrió un error al registrar el pago');
        this.isModalVisible = false;
      }
    });
  }

  // Manejar la cancelación del modal
  handleCancel(): void {
    this.isModalVisible = false; // Cierra el modal
  }

  // Obtener la fecha actual en formato YYYY-MM-DD
  getFechaActual(): string {
    const fechaActual = new Date(); // Obtiene la fecha y hora actual
    return fechaActual.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }
}

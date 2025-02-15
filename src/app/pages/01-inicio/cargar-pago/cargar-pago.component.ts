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

@Component({
  selector: 'app-cargar-pago',
  imports: [CboAtletaComponent, CboMembresiaComponent, ReactiveFormsModule, CommonModule, CboFormasPagoComponent],
  templateUrl: './cargar-pago.component.html',
  styleUrl: './cargar-pago.component.css'
})
export class CargarPagoComponent implements OnInit {
  id_entrenador: number | null = null;
  id_gimnasio: number | null = null;
  gimnasioAtleta: string | null = null;
  pagoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private gimnasioService: GimnasioService,
    private membresiaService: MembresiaService
  ) {
    this.pagoForm = this.fb.group({
      id_atleta: [null, Validators.required],
      id_gimnasio: [null, Validators.required],
      id_membresia: [null, Validators.required],
      monto: [null, Validators.required],
      id_forma_pago: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.id_entrenador = this.authService.getUser()[0].id_entrenador;
  }

  // Maneja la selección de un atleta
  onAtletaSeleccionado(value: number | Atleta): void {
    const idAtleta = typeof value === 'number' ? value : value.id_atleta;
  
    this.gimnasioService.getGimnasioByIdAtleta(idAtleta).subscribe(
      (gimnasio) => {
        this.gimnasioAtleta = gimnasio.nombre; // Almacena el nombre del gimnasio
        this.id_gimnasio = gimnasio.id_gimnasio; // Almacena el ID del gimnasio
        this.pagoForm.get('id_gimnasio')?.setValue(gimnasio.id_gimnasio); // Actualiza el formulario
        this.pagoForm.get('id_atleta')?.setValue(idAtleta); // Actualiza el control 'atleta'
      },
      (error) => {
        console.error('Error al obtener el gimnasio del atleta:', error);
      }
    );
  }

  // Maneja la selección de una membresía
  onMembresiaSeleccionada(membresia: Membresia): void {
    this.pagoForm.get('id_membresia')?.setValue(membresia.id_membresia); // Actualiza el formulario
  }

  // Envía el formulario
  onSubmit(): void {
    if (this.pagoForm.invalid) {
      console.warn('El formulario es inválido.');
      return;
    }

    const formData = this.pagoForm.value;
    formData.fecha_pago = this.getFechaActual();
    console.log('Datos del formulario:', formData);

    // Aquí puedes enviar los datos al backend
  }

  onFormaPagoChange(idFormaPago: number): void {
    console.log('Forma de pago seleccionada:', idFormaPago);
    this.pagoForm.get('id_forma_pago')?.setValue(idFormaPago); // Actualiza el control 'forma_pago'
  }

  getFechaActual(): string {
    const fechaActual = new Date(); // Obtiene la fecha y hora actual
    return fechaActual.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }
}

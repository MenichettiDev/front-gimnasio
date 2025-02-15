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

@Component({
  selector: 'app-cargar-pago',
  imports: [CboAtletaComponent, CboMembresiaComponent, CboGimnasioComponent, ReactiveFormsModule],
  templateUrl: './cargar-pago.component.html',
  styleUrl: './cargar-pago.component.css'
})
export class CargarPagoComponent implements OnInit {
  id_entrenador: number | null = null;
  id_gimnasio: number | null = null;
  membresias: Membresia[] = []; // Lista de membresías cargadas dinámicamente
  pagoForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private membresiaService: MembresiaService
  ) {}

  ngOnInit(): void {
    this.id_entrenador = this.authService.getUser().usuario[0].id_entrenador;
    this.createForm();
  }

  createForm(): void {
    this.pagoForm = this.fb.group({
      atleta: ['', Validators.required],
      gimnasio: ['', Validators.required],
      membresia: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]],
      forma_pago: ['', Validators.required],
    });
  }

  onGimnasioSeleccionado(idGimnasio: number | null): void {
    if (idGimnasio) {
      this.id_gimnasio = idGimnasio; // Actualiza el ID del gimnasio
      this.cargarMembresias(idGimnasio); // Carga las membresías asociadas al gimnasio
    } else {
      this.membresias = []; // Limpia las membresías si no hay gimnasio seleccionado
    }
  }

  cargarMembresias(idGimnasio: number): void {
    this.membresiaService.getMembresiasByIdGimnasio(idGimnasio).subscribe(
      (data) => {
        this.membresias = data; // Asigna las membresías obtenidas
      },
      (error) => {
        console.error('Error al cargar membresías', error);
      }
    );
  }

  onSubmit(): void {
    if (this.pagoForm.invalid) {
      console.warn('El formulario es inválido.');
      return;
    }

    const formData = this.pagoForm.value;
    console.log('Datos del formulario:', formData);

    // Aquí puedes enviar los datos al backend
  }
  }

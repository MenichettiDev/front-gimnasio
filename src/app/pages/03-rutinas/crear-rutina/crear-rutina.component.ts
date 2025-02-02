import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { CboGruposmuscularesComponent } from '../../../components/cbo-gruposmusculares/cbo-gruposmusculares.component';
import { CboEjercicioComponent } from '../../../components/cbo-ejercicio/cbo-ejercicio.component';
import { CboRepeticionesComponent } from '../../../components/cbo-repeticiones/cbo-repeticiones.component';
import { InputTextoComponent } from '../../../components/input-texto/input-texto.component';
import { InputFechaComponent } from '../../../components/input-fecha/input-fecha.component';
import { CboDiasComponent } from '../../../components/cbo-dias/cbo-dias.component';
import { CboNiveldificultadComponent } from '../../../components/cbo-niveldificultad/cbo-niveldificultad.component';
import { CboObjetivoComponent } from '../../../components/cbo-objetivo/cbo-objetivo.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { CboAtletaComponent } from "../../../components/cbo-atleta/cbo-atleta.component";
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-crear-rutina',
  standalone: true,
  templateUrl: './crear-rutina.component.html',
  styleUrls: ['./crear-rutina.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CboGruposmuscularesComponent,
    CboEjercicioComponent,
    CboRepeticionesComponent,
    InputTextoComponent,
    InputFechaComponent,
    CboDiasComponent,
    CboNiveldificultadComponent,
    CboObjetivoComponent,
    ProgressSpinnerModule,
    MessagesModule,
    CboAtletaComponent,
    ButtonModule,
    CalendarModule,
    FormsModule,
    
  ]
})
export class CrearRutinaComponent implements OnInit {
  rutinaForm: FormGroup = new FormGroup({});
  loading = false;
  collapsed: boolean[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.rutinaForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad_dias: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
      nivel_atleta: ['', Validators.required],
      objetivo: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      fecha_asignacion: ['', Validators.required],
      id_atleta: ['', Validators.required],
      dias: this.fb.array([])
    });

    this.agregarDias(this.rutinaForm.get('cantidad_dias')?.value);
  }

  get dias(): FormArray {
    return this.rutinaForm.get('dias') as FormArray;
  }

  agregarDias(cantidadDias: number): void {
    for (let i = 0; i < cantidadDias; i++) {
      this.dias.push(this.fb.group({
        ejercicios: this.fb.array([])
      }));
      this.collapsed.push(true);
    }
  }

  toggleCollapse(index: number): void {
    this.collapsed[index] = !this.collapsed[index];
  }

  agregarEjercicio(diaIndex: number): void {
    const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray);
    ejerciciosArray.push(this.fb.group({
      id_grupo_muscular: ['', Validators.required],
      id_ejercicio: ['', Validators.required],
      id_repeticion: ['', Validators.required]
    }));
  }

  eliminarEjercicio(diaIndex: number, ejercicioIndex: number): void {
    const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray);
    ejerciciosArray.removeAt(ejercicioIndex);
  }

  guardarRutina(): void {
    if (this.rutinaForm.invalid) {
      this.marcarCamposInvalidos();
      return;
    }

    this.loading = true;

    const rutinaData = {
      rutina: {
        id_creador: this.authService.getUser(),
        nombre: this.rutinaForm.get('nombre')?.value,
        cantidad_dias: this.rutinaForm.get('cantidad_dias')?.value,
        nivel_atleta: this.rutinaForm.get('nivel_atleta')?.value,
        objetivo: this.rutinaForm.get('objetivo')?.value,
        descripcion: this.rutinaForm.get('descripcion')?.value,
        id_atleta: this.rutinaForm.get('id_atleta')?.value
      },
      ejercicios: this.dias.controls.map((dia, index) => ({
        dia: index + 1,
        ejercicios: dia.get('ejercicios')?.value
      })),
      fecha_asignacion: this.rutinaForm.get('fecha_asignacion')?.value
    };

    console.log('Datos a enviar:', rutinaData);

    // Simulamos el envío al backend
    setTimeout(() => {
      this.loading = false;
      this.mostrarMensajeExito();
      this.router.navigate(['/home']);
    }, 2000);
  }

  marcarCamposInvalidos(): void {
    Object.values(this.rutinaForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  mostrarMensajeExito(): void {
    // Usar PrimeNG para mostrar un mensaje de éxito
  }

  getEjercicios(dia: AbstractControl): FormArray {
    return dia.get('ejercicios') as FormArray;
  }

  anterior(): void {
    console.log('Botón Anterior clickeado');
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }
}
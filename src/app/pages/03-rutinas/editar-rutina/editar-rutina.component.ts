import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { RutinasService } from '../../../service/rutinas.service';
import { ConfirmacionService } from '../../../service/confirmacion.service';
import { CommonModule } from '@angular/common';
import { InputTextoComponent } from "../../../components/input-texto/input-texto.component";
import { CboAtletaComponent } from "../../../components/cbo-atleta/cbo-atleta.component";
import { CboDiasComponent } from "../../../components/cbo-dias/cbo-dias.component";
import { CboNiveldificultadComponent } from "../../../components/cbo-niveldificultad/cbo-niveldificultad.component";
import { CboObjetivoComponent } from "../../../components/cbo-objetivo/cbo-objetivo.component";
import { InputFechaComponent } from "../../../components/input-fecha/input-fecha.component";
import { CboGruposmuscularesComponent } from "../../../components/cbo-gruposmusculares/cbo-gruposmusculares.component";
import { CboEjercicioComponent } from "../../../components/cbo-ejercicio/cbo-ejercicio.component";
import { CboRepeticionesComponent } from "../../../components/cbo-repeticiones/cbo-repeticiones.component";
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-editar-rutina',
  imports: [FormsModule,
    CommonModule, ReactiveFormsModule,
    InputTextoComponent, CboAtletaComponent,
    CboDiasComponent, CboNiveldificultadComponent,
    CboObjetivoComponent, InputFechaComponent,
    CboGruposmuscularesComponent, CboEjercicioComponent
    , CboRepeticionesComponent, CalendarModule, ButtonModule, ProgressSpinnerModule],

  templateUrl: './editar-rutina.component.html',
  styleUrl: './editar-rutina.component.css'
})
export class EditarRutinaComponent implements OnInit {
  @Input() idRutina: number | null = null;

  rutinaForm: FormGroup;
  collapsed: boolean[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinasService,
    private authService: AuthService,
    private router: Router
  ) {
    this.rutinaForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad_dias: ['', Validators.required],
      nivel_atleta: ['', Validators.required],
      objetivo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_asignacion: ['', Validators.required],
      id_atleta: ['', Validators.required],
      dias: this.fb.array([])
    });
  }

  ngOnInit(): void {
    if (this.idRutina) {
      this.resetForm();
      this.loading = true;
      this.rutinaService.getRutinaByIdRutina(this.idRutina).subscribe({
        next: (rutina: any) => {
          this.cargarDatosRutina(rutina);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  resetForm(): void {
    this.rutinaForm.reset();
    this.dias.clear();
    this.collapsed = [];
  }

  cargarDatosRutina(rutina: any): void {
    if (!rutina || !rutina.rutina) return;

    this.rutinaForm.patchValue({
      nombre: rutina.rutina.nombre,
      cantidad_dias: rutina.rutina.cantidad_dias,
      nivel_atleta: rutina.rutina.nivel_atleta,
      objetivo: rutina.rutina.objetivo,
      descripcion: rutina.rutina.descripcion,
      fecha_asignacion: rutina.rutina.fecha_asignacion,
      id_atleta: rutina.rutina.id_atleta
    });

    // Cargar días y ejercicios
    this.dias.clear();
    this.collapsed = [];
    for (let i = 0; i < rutina.rutina.cantidad_dias; i++) {
      this.dias.push(this.fb.group({ ejercicios: this.fb.array([]) }));
      this.collapsed.push(false);
    }
    rutina.ejercicios.forEach((dia: any, diaIndex: number) => {
      const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray);
      dia.ejercicios.forEach((ejercicio: any) => {
        ejerciciosArray.push(
          this.fb.group({
            id_grupo_muscular: [ejercicio.id_grupo_muscular, Validators.required],
            id_ejercicio: [ejercicio.id_ejercicio, Validators.required],
            id_repeticion: [ejercicio.id_repeticion, Validators.required]
          })
        );
      });
    });
  }

  get dias(): FormArray {
    return this.rutinaForm.get('dias') as FormArray;
  }

  agregarDia(): void {
    this.dias.push(this.fb.group({ ejercicios: this.fb.array([]) }));
    this.collapsed.push(false);
  }

  agregarEjercicio(diaIndex: number): void {
    const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray);
    ejerciciosArray.push(
      this.fb.group({
        id_grupo_muscular: ['', Validators.required],
        id_ejercicio: ['', Validators.required],
        id_repeticion: ['', Validators.required]
      })
    );
  }

  eliminarEjercicio(diaIndex: number, ejercicioIndex: number): void {
    const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray);
    ejerciciosArray.removeAt(ejercicioIndex);
  }

  toggleCollapse(index: number): void {
    this.collapsed[index] = !this.collapsed[index];
  }

  guardarRutina(): void {
    if (this.rutinaForm.invalid) return;

    const rutinaData = {
      rutina: {
        id_creador: this.authService.getUserId(),
        nombre: this.rutinaForm.get('nombre')?.value,
        cantidad_dias: this.rutinaForm.get('cantidad_dias')?.value,
        nivel_atleta: this.rutinaForm.get('nivel_atleta')?.value,
        objetivo: this.rutinaForm.get('objetivo')?.value,
        descripcion: this.rutinaForm.get('descripcion')?.value,
        id_atleta: this.rutinaForm.get('id_atleta')?.value,
        fecha_asignacion: this.rutinaForm.get('fecha_asignacion')?.value
      },
      ejercicios: this.dias.controls.map((dia, diaIndex) => {
        const ejerciciosDia = (dia.get('ejercicios') as FormArray).controls.map((ejercicio) => ({
          id_grupo_muscular: ejercicio.get('id_grupo_muscular')?.value,
          id_ejercicio: ejercicio.get('id_ejercicio')?.value,
          id_repeticion: ejercicio.get('id_repeticion')?.value
        }));
        return { dia: diaIndex + 1, ejercicios: ejerciciosDia };
      })
    };

    this.rutinaService.editarRutina(rutinaData).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => { }
    });
  }

  getControl(diaIndex: number, ejercicioIndex: number, controlName: string): FormControl {
    const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray);
    const ejercicio = ejerciciosArray.at(ejercicioIndex) as FormGroup;
    return ejercicio.get(controlName) as FormControl;
  }

  getEjercicios(dia: any): FormArray {
    return dia.get('ejercicios') as FormArray;
  }

  // Si tienes lógica para filtrar ejercicios por grupo muscular, agrégala aquí
  filtrarEjercicios(diaIndex: number, ejercicioIndex: number, grupoMuscularId: number): void {
    // Implementa si necesitas filtrar ejercicios en el combo
  }

  // Si usas los botones de navegación, implementa aquí
  anterior(): void {
    // Implementa navegación si lo necesitas
  }
  cancelar(): void {
    this.router.navigate(['/home']);
  }
}
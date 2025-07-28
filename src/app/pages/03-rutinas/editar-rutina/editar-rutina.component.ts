import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { RelacionesService } from '../../../service/relaciones.service';


@Component({
  selector: 'app-editar-rutina',
  imports: [FormsModule,
    CommonModule, ReactiveFormsModule,
    InputTextoComponent,
    CboDiasComponent, CboNiveldificultadComponent,
    CboObjetivoComponent, InputFechaComponent,
    CboGruposmuscularesComponent, CboEjercicioComponent
    , CboRepeticionesComponent, CalendarModule, ButtonModule, ProgressSpinnerModule],

  templateUrl: './editar-rutina.component.html',
  styleUrl: './editar-rutina.component.css'
})
export class EditarRutinaComponent implements OnInit {
  idRutina: number | null = null; // Recibe el id de la rutina a editar
  atletas: any[] = []; // Lista de atletas para el select

  rutinaForm: FormGroup; // Formulario reactivo para editar la rutina
  collapsed: boolean[] = []; // Controla el colapso de los días
  loading = false; // Spinner de carga

  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinasService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private relacionesService: RelacionesService

  ) {
    // Inicializa el formulario de edición
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
    this.cargarAtletasPorPerfil();
    this.idRutina = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Cargando rutina con ID:', this.idRutina);
    if (this.idRutina) {
      this.cargarRutina();
    }

    // Dinamiza el agregado/borrado de días al cambiar cantidad_dias
    this.rutinaForm.get('cantidad_dias')?.valueChanges.subscribe((cantidadDias: number) => {
      this.actualizarDias(cantidadDias);
    });
  }

  // Consulta la rutina por id y la carga en el formulario
  cargarRutina(): void {
    this.resetForm();
    this.loading = true;
    this.rutinaService.getRutinaByIdRutina(this.idRutina!).subscribe({
      next: (rutina: any) => {
        this.cargarDatosRutina(rutina);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  cargarAtletasPorPerfil(): void {
    const perfil = this.authService.getIdAcceso();
    if (perfil === 3) { // atleta
      const idAtleta = this.authService.getIdAtleta();
      if (idAtleta) {
        this.relacionesService.getRelacionesActivasAtleta(idAtleta).subscribe(
          res => {
            this.atletas = res?.atleta ? [res.atleta] : [];
            if (!this.atletas.length) {
              const user = this.authService.getUser();
              if (user) {
                this.atletas = [{
                  id_atleta: user.id_atleta,
                  nombre: user.nombre,
                  apellido: user.apellido
                }];
              }
            }
          },
          err => this.atletas = []
        );
      }
    } else if (perfil === 2) { // entrenador
      const idEntrenador = this.authService.getIdEntrenador();
      if (idEntrenador) {
        this.relacionesService.getRelacionesActivasEntrenador(idEntrenador).subscribe(
          res => {
            this.atletas = res?.atletas || [];
            const user = this.authService.getUser();
            if (user && user.id_atleta) {
              const yaIncluido = this.atletas.some(a => a.id_atleta === user.id_atleta);
              if (!yaIncluido) {
                this.atletas.unshift({
                  id_atleta: user.id_atleta,
                  nombre: user.nombre,
                  apellido: user.apellido
                });
              }
            }
            const genericoIncluido = this.atletas.some(a => a.id_atleta === 0);
            if (!genericoIncluido) {
              this.atletas.unshift({
                id_atleta: 0,
                nombre: 'Atleta ',
                apellido: 'Generico'
              });
            }
          },
          err => this.atletas = []
        );
      }
    } else if (perfil === 4) { // gimnasio
      const idGimnasio = this.authService.getIdGimnasio();
      if (idGimnasio) {
        this.relacionesService.getRelacionesActivasGimnasio(idGimnasio).subscribe(
          res => {
            this.atletas = res?.atletas || [];
            const genericoIncluido = this.atletas.some(a => a.id_atleta === 0);
            if (!genericoIncluido) {
              this.atletas.unshift({
                id_atleta: 0,
                nombre: 'Atleta Genérico',
                apellido: ''
              });
            }
          },
          err => this.atletas = []
        );
      }
    }
  }

  // Limpia el formulario y los días
  resetForm(): void {
    this.rutinaForm.reset();
    this.dias.clear();
    this.collapsed = [];
  }

  // Carga los datos de la rutina en el formulario reactivo
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

    // Carga los días y ejercicios
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

  // Getter para el array de días
  get dias(): FormArray {
    return this.rutinaForm.get('dias') as FormArray;
  }

  // Agrega un nuevo día al formulario
  agregarDia(): void {
    this.dias.push(this.fb.group({ ejercicios: this.fb.array([]) }));
    this.collapsed.push(false);
  }

  // Agrega un ejercicio a un día específico
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

  // Elimina un ejercicio de un día específico
  eliminarEjercicio(diaIndex: number, ejercicioIndex: number): void {
    const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray);
    ejerciciosArray.removeAt(ejercicioIndex);
  }

  // Alterna el colapso/expansión de un día
  toggleCollapse(index: number): void {
    this.collapsed[index] = !this.collapsed[index];
  }

  // Guarda la rutina editada
  guardarRutina(): void {
    if (this.rutinaForm.invalid) return;

    const form = this.rutinaForm;
    const rutinaData = {
      rutina: {
        id_creador: Number(this.authService.getUserId()),
        nombre: form.get('nombre')?.value,
        cantidad_dias: Number(form.get('cantidad_dias')?.value),
        nivel_atleta: Number(form.get('nivel_atleta')?.value),
        objetivo: Number(form.get('objetivo')?.value),
        descripcion: form.get('descripcion')?.value,
        id_atleta: typeof form.get('id_atleta')?.value === 'object'
          ? Number(form.get('id_atleta')?.value.id_atleta)
          : Number(form.get('id_atleta')?.value),
        fecha_asignacion: formatoFecha(form.get('fecha_asignacion')?.value)
      },
      ejercicios: this.dias.controls.map((dia, diaIndex) => {
        const ejerciciosDia = (dia.get('ejercicios') as FormArray).controls.map((ejercicio) => ({
          id_grupo_muscular: Number(ejercicio.get('id_grupo_muscular')?.value),
          id_ejercicio: Number(ejercicio.get('id_ejercicio')?.value),
          id_repeticion: Number(ejercicio.get('id_repeticion')?.value)
        }));
        return { dia: diaIndex + 1, ejercicios: ejerciciosDia };
      })
    };

    this.rutinaService.createRutina(rutinaData).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => { }
    });
  }

  // Devuelve el control de un ejercicio específico
  getControl(diaIndex: number, ejercicioIndex: number, controlName: string): FormControl {
    const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray);
    const ejercicio = ejerciciosArray.at(ejercicioIndex) as FormGroup;
    return ejercicio.get(controlName) as FormControl;
  }

  // Devuelve el array de ejercicios de un día
  getEjercicios(dia: any): FormArray {
    return dia.get('ejercicios') as FormArray;
  }

  // Filtra ejercicios por grupo muscular (si lo necesitas en el combo)
  filtrarEjercicios(diaIndex: number, ejercicioIndex: number, grupoMuscularId: number): void {
    // Implementa si necesitas filtrar ejercicios en el combo
  }


  // Cancela y vuelve al home
  cancelar(): void {
    this.router.navigate(['/home']);
  }

  // Actualiza los días en el formulario según la cantidad indicada
  actualizarDias(cantidadDias: number): void {
    const diasActuales = this.dias.length;
    if (cantidadDias > diasActuales) {
      for (let i = diasActuales; i < cantidadDias; i++) {
        this.dias.push(this.fb.group({ ejercicios: this.fb.array([]) }));
        this.collapsed.push(false);
      }
    } else if (cantidadDias < diasActuales) {
      for (let i = diasActuales - 1; i >= cantidadDias; i--) {
        this.dias.removeAt(i);
        this.collapsed.splice(i, 1);
      }
    }
  }
}

function formatoFecha(fecha: Date | string): string {
  if (!fecha) return '';
  if (typeof fecha === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) return fecha;
  const fechaDate = new Date(fecha);
  const year = fechaDate.getFullYear();
  const month = String(fechaDate.getMonth() + 1).padStart(2, '0');
  const day = String(fechaDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
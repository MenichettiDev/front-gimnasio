import { ConfirmacionService } from '../../../service/confirmacion.service';
import { CommonModule } from '@angular/common';
import { InputTextoComponent } from "../../input-texto/input-texto.component";
import { CboAtletaComponent } from "../../cbo-atleta/cbo-atleta.component";
import { CboDiasComponent } from "../../cbo-dias/cbo-dias.component";
import { CboNiveldificultadComponent } from "../../cbo-niveldificultad/cbo-niveldificultad.component";
import { CboObjetivoComponent } from "../../cbo-objetivo/cbo-objetivo.component";
import { InputFechaComponent } from "../../input-fecha/input-fecha.component";
import { CboGruposmuscularesComponent } from "../../cbo-gruposmusculares/cbo-gruposmusculares.component";
import { CboEjercicioComponent } from "../../cbo-ejercicio/cbo-ejercicio.component";
import { CboRepeticionesComponent } from "../../cbo-repeticiones/cbo-repeticiones.component";
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { RutinasService } from '../../../service/rutinas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-edicion',
  imports: [FormsModule,
    CommonModule, ReactiveFormsModule,
    InputTextoComponent, CboAtletaComponent,
    CboDiasComponent, CboNiveldificultadComponent,
    CboObjetivoComponent, InputFechaComponent,
    CboGruposmuscularesComponent, CboEjercicioComponent
    , CboRepeticionesComponent, CalendarModule, ButtonModule, ProgressSpinnerModule],
  templateUrl: './test-edicion.component.html',
  styleUrl: './test-edicion.component.css'
})
export class TestEdicionComponent implements OnInit, OnChanges {
  @Input() idRutina: number = 0; // Rutina existente que se recibe como entrada
  rutinaSeleccionada: any; // Rutina existente que se recibe como entrada
  rutinaForm: FormGroup = new FormGroup({});
  loading = false;
  collapsed: boolean[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private rutinaService: RutinasService,
    private confirmacionService: ConfirmacionService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    // if (this.rutinaSeleccionada !== 0) {
    //   this.cargarDatosRutina(this.rutinaSeleccionada);
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si la propiedad 'idRutina' ha cambiado
    if (changes['idRutina'] && changes['idRutina'].currentValue) {
      this.resetForm(); // Reinicia el formulario antes de cargar nuevos datos
      this.loading = true; // Activa el spinner
      this.obtenerRutinaPorId(this.idRutina); // Llama al método para obtener la rutina por ID
    }
  }

  obtenerRutinaPorId(id_rutina: number): void {
    this.rutinaService.getRutinaByIdRutina(id_rutina).subscribe(
      (rutina: any) => {
        this.rutinaSeleccionada = rutina; // Asigna los datos de la rutina encontrada
        this.cargarDatosRutina(this.rutinaSeleccionada); // Carga los datos en el formulario
        this.loading = false; // Desactiva el spinner
      },
      (error) => {
        console.error('Error al obtener la rutina:', error);
        this.loading = false; // Asegúrate de desactivar el spinner en caso de error
      }
    );
  }

  resetForm(): void {
    this.rutinaForm.reset(); // Limpia el formulario
    // this.dias.clear(); // Limpia los días existentes
    // this.collapsed = []; // Reinicia el estado colapsado
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
  }

  cargarDatosRutina(rutina: any): void {

    if (!rutina || !rutina.rutina) {
      return;
    }

    // Asignar los valores básicos del formulario
    this.rutinaForm.patchValue({
      nombre: rutina.rutina.nombre,
      cantidad_dias: rutina.rutina.cantidad_dias,
      nivel_atleta: rutina.rutina.nivel_atleta,
      objetivo: rutina.rutina.objetivo,
      descripcion: rutina.rutina.descripcion,
      fecha_asignacion: rutina.rutina.fecha_asignacion,
      id_atleta: rutina.rutina.id_atleta
    });

    // Limpiar el FormArray de días antes de agregar nuevos
    this.dias.clear();

    // Agregar los días necesarios al formulario
    for (let i = 0; i < rutina.rutina.cantidad_dias; i++) {
      this.agregarDia();
    }

    // Cargar los ejercicios para cada día
    rutina.ejercicios.forEach((dia: any, diaIndex: number) => {
      if (!dia.ejercicios || dia.ejercicios.length === 0) {
        console.warn(`No hay ejercicios disponibles para el día ${diaIndex + 1}.`);
        return;
      }

      // Obtener el FormArray de ejercicios para este día
      const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray);

      // Agregar y cargar los ejercicios para este día
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

  agregarDias(cantidadDias: number): void {
    for (let i = 0; i < cantidadDias; i++) {
      this.dias.push(this.fb.group({ ejercicios: this.fb.array([]) }));
      this.collapsed.push(false);
    }
  }

  agregarDia(): void {
    this.dias.push(
      this.fb.group({
        ejercicios: this.fb.array([]) // FormArray para los ejercicios del día
      })
    );
    this.collapsed.push(false); // Inicializar el estado colapsado del día
  }

  toggleCollapse(index: number): void {
    this.collapsed[index] = !this.collapsed[index];
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

  guardarRutina(): void {
    if (this.rutinaForm.invalid) {
      console.warn('El formulario es inválido.');
      return;
    }

    const rutinaData = {
      rutina: {
        id_creador: this.authService.getUserId(),
        nombre: this.rutinaForm.get('nombre')?.value,
        cantidad_dias: this.rutinaForm.get('cantidad_dias')?.value,
        nivel_atleta: this.rutinaForm.get('nivel_atleta')?.value,
        objetivo: this.rutinaForm.get('objetivo')?.value,
        descripcion: this.rutinaForm.get('descripcion')?.value,
        id_atleta: this.rutinaForm.get('id_atleta')?.value.id_atleta,
        fecha_asignacion: this.formatoFecha(this.rutinaForm.get('fecha_asignacion')?.value)
      },
      ejercicios: (this.dias as FormArray).controls.map((dia, diaIndex) => {
        const ejerciciosDia = (dia.get('ejercicios') as FormArray).controls.map((ejercicio) => {
          return {
            id_grupo_muscular: ejercicio.get('id_grupo_muscular')?.value,
            id_ejercicio: ejercicio.get('id_ejercicio')?.value,
            id_repeticion: ejercicio.get('id_repeticion')?.value
          };
        });
        return {
          dia: diaIndex + 1,
          ejercicios: ejerciciosDia
        };
      })
    };

    this.rutinaService.createRutina(rutinaData).subscribe(
      response => {
        this.loading = false;
        this.confirmacionService.showSuccess('Rutina reaplicada exitosamente');
        this.router.navigate(['/home']);
      },
      error => {
        this.loading = false;
        console.error('Error al reaplicar la rutina', error);
        this.confirmacionService.showError('Error al reaplicar la rutina');
      }
    );
  }

  formatoFecha(fecha: Date | string): string {
    if (!fecha) return '';
    const fechaDate = new Date(fecha);
    const year = fechaDate.getFullYear();
    const month = String(fechaDate.getMonth() + 1).padStart(2, '0');
    const day = String(fechaDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  anterior(): void {
    this.router.navigate(['/home']);
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }

  getControl(diaIndex: number, ejercicioIndex: number, controlName: string): FormControl {
    const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray);
    const ejercicio = ejerciciosArray.at(ejercicioIndex) as FormGroup;
    return ejercicio.get(controlName) as FormControl;
  }

  getEjercicios(dia: AbstractControl): FormArray {
    return dia.get('ejercicios') as FormArray;
  }

  filtrarEjercicios(diaIndex: number, ejercicioIndex: number, grupoMuscularId: number): void {
    // Verifica que el índice del día y el ejercicio sean válidos
    if (this.dias.length <= diaIndex) {
      console.error(`Índice de día inválido: ${diaIndex}`);
      return;
    }

    const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray);
    if (ejerciciosArray.length <= ejercicioIndex) {
      console.error(`Índice de ejercicio inválido: ${ejercicioIndex} en el día ${diaIndex}`);
      return;
    }

    // Obtener el FormGroup del ejercicio específico
    const ejercicio = ejerciciosArray.at(ejercicioIndex) as FormGroup;

    // Limpiar el campo de ejercicio seleccionado
    ejercicio.get('id_ejercicio')?.setValue('');

    // Actualizar el valor del grupo muscular en el formulario
    ejercicio.get('id_grupo_muscular')?.setValue(grupoMuscularId);

  }
}
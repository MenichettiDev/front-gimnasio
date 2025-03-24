import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { RutinasService } from '../../../service/rutinas.service';
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
export class EditarRutinaComponent implements OnInit, OnChanges {
  @Input() idRutina: number | null = null ; // Rutina existente que se recibe como entrada
  
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
    this.listenToDiasChanges(); // Escuchar cambios en el campo cantidad_dias
    }
    
    ngOnChanges(changes: SimpleChanges): void {
    this.createForm();
    // console.log(' cambios de editar rutina');
    // Verifica si la propiedad 'idRutina' ha cambiado
    if (changes['idRutina'] && changes['idRutina'].currentValue && this.idRutina) {
      this.resetForm(); // Reinicia el formulario antes de cargar nuevos datos
      this.loading = true; // Activa el spinner
      this.obtenerRutinaPorId(this.idRutina); // Llama al método para obtener la rutina por ID
    }
  }

  obtenerRutinaPorId(id_rutina: number): void {
    this.rutinaService.getRutinaByIdRutina(id_rutina).subscribe(
      (rutina: any) => {
        this.rutinaSeleccionada = rutina; // Asigna los datos de la rutina encontrada
        // console.log('Rutina seleccionada:', this.rutinaSeleccionada);
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
      cantidad_dias: ['', Validators.required],
      nivel_atleta: ['', Validators.required],
      objetivo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_asignacion: ['', Validators.required],
      id_atleta: ['', Validators.required],
      dias: this.fb.array([])
    });
  }

  cargarDatosRutina(rutina: any): void {
    // console.log('Cargar datos de la rutina:', rutina);
  
    if (!rutina || !rutina.rutina) {
      console.error('La estructura de la rutina no es válida:', rutina);
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
    console.log('Valor de nivel_atleta:', this.rutinaForm.get('nivel_atleta')?.value);
    
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
      console.log('Estado del FormArray:', ejerciciosArray.value);
    });
    console.log('Datos del formulario después de cargar:', this.rutinaForm.value);
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
        id_creador: this.authService.getIdPersona(),
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

    console.log('Datos de la rutina a guardar:', rutinaData);
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

  // Método para escuchar cambios en el campo cantidad_dias
listenToDiasChanges(): void {
  const cantidadDiasControl = this.rutinaForm.get('cantidad_dias');
  if (cantidadDiasControl) {
    cantidadDiasControl.valueChanges.subscribe((nuevaCantidadDias: number) => {
      this.ajustarDias(nuevaCantidadDias);
    });
  }
}

// Método para ajustar los días según la nueva cantidad
ajustarDias(nuevaCantidadDias: number): void {
  const diasActuales = this.dias.length;

  if (nuevaCantidadDias > diasActuales) {
    // Agregar días adicionales
    const diasAgregados = nuevaCantidadDias - diasActuales;
    for (let i = 0; i < diasAgregados; i++) {
      this.agregarDia();
    }
  } else if (nuevaCantidadDias < diasActuales) {
    // Eliminar días sobrantes
    const diasEliminados = diasActuales - nuevaCantidadDias;
    for (let i = 0; i < diasEliminados; i++) {
      this.dias.removeAt(this.dias.length - 1);
      this.collapsed.pop(); // También elimina el estado colapsado del día
    }
  }
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

    console.log(`Filtrando ejercicios para el día ${diaIndex + 1}, ejercicio ${ejercicioIndex + 1}, grupo muscular: ${grupoMuscularId}`);
  }
}
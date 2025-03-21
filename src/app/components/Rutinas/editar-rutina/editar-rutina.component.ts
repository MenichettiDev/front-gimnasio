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
    , CboRepeticionesComponent, CalendarModule, ButtonModule,ProgressSpinnerModule],
  templateUrl: './editar-rutina.component.html',
  styleUrl: './editar-rutina.component.css'
})
export class EditarRutinaComponent implements OnInit , OnChanges{
  @Input() rutinaExistente: any; // Rutina existente que se recibe como entrada
  rutinaForm: FormGroup = new FormGroup({});
  loading = false;
  collapsed: boolean[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private rutinaService: RutinasService,
    private confirmacionService: ConfirmacionService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.rutinaExistente) {
      this.cargarDatosRutina(this.rutinaExistente);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si la propiedad 'rutinaExistente' ha cambiado
    if (changes['rutinaExistente'] && changes['rutinaExistente'].currentValue) {
      console.log('Rutina existente actualizada:', this.rutinaExistente);
      this.resetForm(); // Reinicia el formulario antes de cargar nuevos datos
      this.cargarDatosRutina(this.rutinaExistente);
    }
  }

  resetForm(): void {
    this.rutinaForm.reset(); // Limpia el formulario
    this.dias.clear(); // Limpia los días existentes
    this.collapsed = []; // Reinicia el estado colapsado
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
    this.rutinaForm.patchValue({
      nombre: rutina.nombre,
      cantidad_dias: rutina.cantidad_dias,
      nivel_atleta: rutina.nivel_atleta,
      objetivo: rutina.objetivo,
      descripcion: rutina.descripcion,
      fecha_asignacion: rutina.fecha_asignacion,
      id_atleta: rutina.id_atleta
    });

    this.agregarDias(rutina.cantidad_dias);

    rutina.dias.forEach((dia: any, diaIndex: number) => {
      dia.ejercicios.forEach((ejercicio: any) => {
        this.agregarEjercicio(diaIndex);
        const ejerciciosArray = (this.dias.at(diaIndex).get('ejercicios') as FormArray).at(-1) as FormGroup;
        ejerciciosArray.patchValue({
          id_grupo_muscular: ejercicio.id_grupo_muscular,
          id_ejercicio: ejercicio.id_ejercicio,
          id_repeticion: ejercicio.id_repeticion
        });
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
  
    console.log(`Filtrando ejercicios para el día ${diaIndex + 1}, ejercicio ${ejercicioIndex + 1}, grupo muscular: ${grupoMuscularId}`);
  }
}
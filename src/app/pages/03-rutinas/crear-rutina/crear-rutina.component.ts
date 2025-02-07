import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, FormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { RutinasService } from '../../../service/rutinas.service';
import { ConfirmacionService } from '../../../service/confirmacion.service';
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
    private rutinaService : RutinasService,
    private confirmacionService : ConfirmacionService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();

    // Escuchar cambios en el campo 'cantidad_dias'
    this.rutinaForm.get('cantidad_dias')?.valueChanges.subscribe((cantidadDias: number) => {
      this.dias.clear(); // Limpiar los días existentes
      this.collapsed = []; // Reiniciar el estado colapsado
      this.agregarDias(cantidadDias); // Agregar nuevos días
    });

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
      this.collapsed.push(false);
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

  construirYEnviarDatos(): void {
    const rutinaData = {
      rutina: {
        id_creador: this.authService.getUser().usuario[0].id_persona,
        nombre: this.rutinaForm.get('nombre')?.value,
        cantidad_dias: this.rutinaForm.get('cantidad_dias')?.value,
        nivel_atleta: this.rutinaForm.get('nivel_atleta')?.value,
        objetivo: this.rutinaForm.get('objetivo')?.value,
        descripcion: this.rutinaForm.get('descripcion')?.value,
        id_atleta: this.rutinaForm.get('id_atleta')?.value
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
          dia: diaIndex + 1, // Los días deben ser numerados desde 1
          ejercicios: ejerciciosDia
        };
      }),
      fecha_asignacion: this.formatoFecha(this.rutinaForm.get('fecha_asignacion')?.value)
    };

    console.log('Datos formateados para enviar:', rutinaData);

    if (rutinaData) {
      // Llamar al servicio para crear el ejercicio
      this.rutinaService.createRutina(rutinaData).subscribe(
        response => {

          this.loading = false; // Detener el spinner
          this.confirmacionService.showSuccess('Operación exitosa');
        },
        error => {
          // Si ocurre un error
          this.loading = false; // Detener el spinner
          console.error('Error al crear la rutina', error);
          this.confirmacionService.showError('Error al crear la rutina');
        }
      );
    } else {
      // Si el formulario no es válido
      this.loading = false;
      this.confirmacionService.showError('Por favor, complete todos los campos');
    }

      // Navegar a la página de inicio
      this.router.navigate(['/home']);
    
  }



  formatoFecha(fecha: Date | string): string {
    if (!fecha) return '';
    const fechaDate = new Date(fecha);
    const year = fechaDate.getFullYear();
    const month = String(fechaDate.getMonth() + 1).padStart(2, '0');
    const day = String(fechaDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  marcarCamposInvalidos(): void {
    Object.keys(this.rutinaForm.controls).forEach((controlName) => {
      const control = this.rutinaForm.get(controlName);
      if (control?.invalid) {
        console.warn(`Campo inválido: ${controlName}`, control.errors);
      }
      control?.markAsTouched();
    });

    // También verifica los FormArrays anidados
    this.dias.controls.forEach((dia, diaIndex) => {
      const ejerciciosArray = dia.get('ejercicios') as FormArray;
      ejerciciosArray.controls.forEach((ejercicio, ejercicioIndex) => {
        Object.keys((ejercicio as FormGroup).controls).forEach((controlName) => {
          const control = ejercicio.get(controlName);
          if (control?.invalid) {
            console.warn(`Ejercicio inválido en día ${diaIndex + 1}, campo: ${controlName}`, control.errors);
          }
          control?.markAsTouched();
        });
      });
    });
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

  filtrarEjercicios(diaIndex: number, ejercicioIndex: number, grupoMuscularId: number): void {
    console.log('ID del grupo muscular seleccionado:', grupoMuscularId); // Verifica este valor
    const ejercicio = (this.dias.at(diaIndex).get('ejercicios') as FormArray).at(ejercicioIndex);

    // Limpiar el ejercicio seleccionado
    ejercicio.get('id_ejercicio')?.setValue('');

    // Actualizar el valor del grupo muscular en el formulario
    ejercicio.get('id_grupo_muscular')?.setValue(grupoMuscularId);
  }

  getControl(diaIndex: number, ejercicioIndex: number, controlName: string): FormControl {
    const ejercicio = (this.dias.at(diaIndex).get('ejercicios') as FormArray).at(ejercicioIndex);
    // console.log(`Obteniendo control '${controlName}' para el día ${diaIndex + 1}, ejercicio ${ejercicioIndex + 1}:`, ejercicio.get(controlName));
    return ejercicio.get(controlName) as FormControl;
  }

  guardarRutina(): void {
    console.log('Valores actuales del formulario:', this.rutinaForm.value);
    console.log(this.authService.getUser().usuario[0].id_persona);

    if (this.rutinaForm.invalid) {
      console.warn('El formulario es inválido.');
      this.marcarCamposInvalidos();
      return;
    }

    // Validar que la fecha no esté vacía
    const fechaAsignacion = this.rutinaForm.get('fecha_asignacion')?.value;
    if (!fechaAsignacion) {
      console.error('La fecha de asignación no puede estar vacía.');
      return;
    }

    // Validar que todos los ejercicios tengan repeticiones seleccionadas
    const diasArray = this.dias as FormArray;
    let hayErrores = false;

    diasArray.controls.forEach((dia, diaIndex) => {
      const ejerciciosArray = dia.get('ejercicios') as FormArray;
      ejerciciosArray.controls.forEach((ejercicio, ejercicioIndex) => {
        const repeticion = ejercicio.get('id_repeticion')?.value;
        if (!repeticion) {
          console.error(`Falta seleccionar repeticiones para el ejercicio ${ejercicioIndex + 1} del día ${diaIndex + 1}.`);
          hayErrores = true;
        }
      });
    });

    if (hayErrores) {
      console.warn('Corrige los errores antes de continuar.');
      return;
    }

    // Continuar con la construcción del objeto
    this.construirYEnviarDatos();
  }
}
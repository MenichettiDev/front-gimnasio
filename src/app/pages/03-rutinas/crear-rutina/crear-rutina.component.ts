import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, FormsModule, FormControl } from '@angular/forms';
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
    console.log('Iniciando el proceso de guardar rutina...');
  
    // Verificar si el formulario es inválido
    if (this.rutinaForm.invalid) {
      console.warn('El formulario es inválido. Marcando campos como tocados...');
      this.marcarCamposInvalidos();
      return;
    }
  
    console.log('El formulario es válido. Preparando datos para enviar...');
  
    // Activar el spinner de carga
    this.loading = true;
  
    // Construir el objeto de datos de la rutina
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
      ejercicios: this.dias.controls.map((dia, index) => {
        const ejerciciosDia = dia.get('ejercicios')?.value;
        console.log(`Ejercicios del día ${index + 1}:`, ejerciciosDia);
        return {
          dia: index + 1,
          ejercicios: ejerciciosDia
        };
      }),
      fecha_asignacion: this.rutinaForm.get('fecha_asignacion')?.value
    };
  
    // Mostrar los datos que se enviarán
    console.log('Datos completos a enviar:', rutinaData);
  
    // Simular el envío al backend
    console.log('Simulando el envío al backend...');
    setTimeout(() => {
      console.log('Respuesta simulada recibida. Desactivando el spinner...');
      this.loading = false;
  
      // Mostrar mensaje de éxito
      console.log('Mostrando mensaje de éxito...');
      this.mostrarMensajeExito();
  
      // Navegar a la página de inicio
      console.log('Navegando a la página de inicio...');
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
    return ejercicio.get(controlName) as FormControl;
  }
  
}
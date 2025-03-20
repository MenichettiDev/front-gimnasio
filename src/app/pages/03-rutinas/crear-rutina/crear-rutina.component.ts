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
import { CrearRutComponent } from "../../../components/Rutinas/crear-rutina/crear-rutina.component";

@Component({
  selector: 'app-crear-rutina',
  standalone: true,
  templateUrl: './crear-rutina.component.html',
  styleUrls: ['./crear-rutina.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    MessagesModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    CrearRutComponent
]
})
export class CrearRutinaComponent {

}
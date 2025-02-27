import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CboAtletaComponent } from '../../../components/cbo-atleta/cbo-atleta.component';
import { FormsModule } from '@angular/forms';
import { TbRutinasComponent } from '../../../components/tb-rutinas/tb-rutinas.component';
import { Atleta } from '../../../data/interfaces/atletaInterface';
import { AuthService } from '../../../service/auth/auth.service';
import { EntrenadorService } from '../../../service/entrenador.service';
import { Entrenador } from '../../../data/interfaces/entrenadorInterface';

@Component({
  selector: 'app-coach',
  imports: [CommonModule, CboAtletaComponent, FormsModule, TbRutinasComponent],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.css'
})
export class CoachComponent implements OnInit {


  idAtletaSeleccionado: number | null = null;
  id_entrenador: number | null = null;
  id_persona: number | null = null;
  constructor(private authService: AuthService, private entrenadorService: EntrenadorService) { }


  ngOnInit(): void {

    this.id_persona = this.authService.getUser()[0].id_persona;
    // Obtener el usuario actual desde el servicio de autenticación

    // Usar el ID de la persona para obtener el entrenador correspondiente
    this.entrenadorService.getEntrenadorById(this.id_persona!).subscribe({
      next: (entrenador) => {
        if (entrenador) {
          this.id_entrenador = entrenador.id_entrenador; // Asignar el ID del entrenador
          console.log('ID del entrenador:', this.id_entrenador);
        } else {
          console.error('No se encontró ningún entrenador con el ID proporcionado.');
        }
      },
      error: (err) => {
        console.error('Error al obtener el entrenador:', err);
      }
    });
  }

  onAtletaSeleccionado(value: number | Atleta): void {
    if (typeof value === 'number') {
      this.idAtletaSeleccionado = value; // Si es un número, asignarlo directamente
      console.log( 'atleta seleccionado : ' , this.idAtletaSeleccionado);
    } else if (value && typeof value === 'object' && 'id_atleta' in value) {
      this.idAtletaSeleccionado = value.id_atleta; // Si es un objeto Atleta, extraer el ID
    }
  }
}

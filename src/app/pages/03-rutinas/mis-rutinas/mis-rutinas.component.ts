import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CboAtletaComponent } from '../../../components/cbo-atleta/cbo-atleta.component';
import { FormsModule } from '@angular/forms';
import { TbRutinasComponent } from '../../../components/tb-rutinas/tb-rutinas.component';
import { Atleta } from '../../../data/interfaces/atletaInterface';
import { AuthService } from '../../../service/auth/auth.service';
import { EntrenadorService } from '../../../service/entrenador.service';
import { Entrenador } from '../../../data/interfaces/entrenadorInterface';
import { AtletaService } from '../../../service/atleta.service';

@Component({
  selector: 'app-mis-rutinas',
  standalone: true,
  imports: [CommonModule, FormsModule, TbRutinasComponent],
  templateUrl: './mis-rutinas.component.html',
  styleUrls: ['./mis-rutinas.component.css']
})
export class MisRutinasComponent implements OnInit {


  idAtletaSeleccionado: number | null = null;
  id_atleta: number | null = null;
  id_persona: number | null = null;
  constructor(private authService: AuthService, private atletaService: AtletaService) { }


  ngOnInit(): void {

    this.id_persona = this.authService.getUser()[0].id_persona;
    // Obtener el usuario actual desde el servicio de autenticación

    // Usar el ID de la persona para obtener el entrenador correspondiente
    this.atletaService.getAtletasPorIdPersona(this.id_persona!).subscribe({
      next: (atleta) => {
        if (atleta) {
          console.log( 'arleta completo: ' , atleta);
          this.id_atleta = atleta.id_atleta; // Asignar el ID del entrenador
          console.log('ID del atleta:', this.id_atleta);
        } else {
          console.error('No se encontró ningún atleta con el ID proporcionado.');
        }
      },
      error: (err) => {
        console.error('Error al obtener el atleta:', err);
      }
    });
  }




}
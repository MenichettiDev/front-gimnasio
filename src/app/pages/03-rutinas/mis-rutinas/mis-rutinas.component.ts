import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CboAtletaComponent } from '../../../components/cbo-atleta/cbo-atleta.component';
import { FormsModule } from '@angular/forms';
import { TbRutinasComponent } from '../../../components/Rutinas/tb-rutinas/tb-rutinas.component';
import { Atleta } from '../../../data/interfaces/atletaInterface';
import { AuthService } from '../../../service/auth/auth.service';
import { EntrenadorService } from '../../../service/entrenador.service';
import { Entrenador } from '../../../data/interfaces/entrenadorInterface';
import { AtletaService } from '../../../service/atleta.service';
import { RutinasService } from '../../../service/rutinas.service'; // Add missing import
import { ModalVisorRutinaComponent } from '../../../components/Rutinas/modal-visor-rutina/modal-visor-rutina.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

// Add import for plan interface - adjust path as needed
// import { plan } from '../../../data/interfaces/planInterface';

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
  id_entrenador: number | null = null;
  id_gimnasio: number | null = null;
  id_persona: number | null = null;
  test: number | null = null;
  test2: number | null = null;

  // Add missing properties
  idAtleta: number | null = null;
  idEntrenador: number | null = null;
  idGimnasio: number | null = null;
  rutinas: any[] = []; // Adjust type as needed

  // Rutinas categorizadas por creador
  rutinasDelEntrenador: any[] = [];
  rutinasDelGimnasio: any[] = [];
  rutinasDelAtleta: any[] = [];

  constructor(
    private authService: AuthService,
    private atletaService: AtletaService,
    private dialog: MatDialog,
    private rutinaService: RutinasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_persona = this.authService.getUserId();

    this.atletaService.getAtletasPorIdPersona(this.id_persona!).subscribe({
      next: (atleta) => {
        if (atleta) {
          console.log('atleta completo: ', atleta);
          this.id_atleta = atleta.id_atleta;
          this.id_entrenador = atleta.id_entrenador;
          this.id_gimnasio = atleta.id_gimnasio;

          // Set the properties used in rutinaService call
          this.idAtleta = this.id_atleta;
          this.idEntrenador = this.id_entrenador;
          this.idGimnasio = this.id_gimnasio;

          console.log('ID del atleta:', this.id_atleta);

          // Move the rutinaService call inside the success callback
          this.rutinaService.getRutinaByIdAtleta(
            this.idAtleta!,
            this.idEntrenador ?? 0,
            this.idGimnasio ?? 0
          ).subscribe({
            next: (data: any[]) => {
              this.rutinas = data.map(plan => plan.rutina);
              this.categorizarRutinas();
            },
            error: (error) => {
              console.error('Error al cargar rutinas', error);
            }
          });
        } else {
          console.error('No se encontró ningún atleta con el ID proporcionado.');
        }
      },
      error: (err) => {
        console.error('Error al obtener el atleta:', err);
      }
    });
  }

  // Método para categorizar rutinas según el creador
  categorizarRutinas(): void {
    console.log('=== DEBUG CATEGORIZACIÓN ===');
    console.log('ID Atleta:', this.id_atleta);
    console.log('ID Entrenador:', this.id_entrenador);
    console.log('ID Gimnasio:', this.id_gimnasio);
    console.log('ID Persona (usuario logueado):', this.id_persona);
    console.log('Rutinas totales:', this.rutinas);

    // Verificar los id_creador de cada rutina
    this.rutinas.forEach((rutina, index) => {
      console.log(`Rutina ${index + 1}: ${rutina.nombre}, id_creador: ${rutina.id_creador}, id_atleta: ${rutina.id_atleta}`);
    });

    // Rutinas creadas por el atleta (id_creador coincide con id_persona del usuario logueado)
    this.rutinasDelAtleta = this.rutinas.filter(rutina => {
      const esDelAtleta = Number(rutina.id_creador) === Number(this.id_persona);
      console.log(`Rutina "${rutina.nombre}" - Creador: ${rutina.id_creador}, Persona: ${this.id_persona}, Es del atleta: ${esDelAtleta}`);
      return esDelAtleta;
    });

    // Rutinas asignadas al atleta por el entrenador (id_atleta del atleta actual y id_creador diferente al atleta)
    this.rutinasDelEntrenador = this.rutinas.filter(rutina => {
      // Si la rutina está asignada al atleta (id_atleta coincide) y no fue creada por el atleta (persona logueada)
      const esAsignadaPorEntrenador = (
        Number(rutina.id_atleta) === Number(this.id_atleta) &&
        Number(rutina.id_creador) !== Number(this.id_persona)
      );
      console.log(`Rutina "${rutina.nombre}" - Es del entrenador: ${esAsignadaPorEntrenador}`);
      return esAsignadaPorEntrenador;
    });

    // Rutinas del gimnasio (las que no son del atleta ni están asignadas al atleta)
    this.rutinasDelGimnasio = this.rutinas.filter(rutina => {
      const noEsDelAtleta = Number(rutina.id_creador) !== Number(this.id_persona);
      const noEstaAsignadaAlAtleta = Number(rutina.id_atleta) !== Number(this.id_atleta) || Number(rutina.id_atleta) === 0;

      const esDelGimnasio = noEsDelAtleta && noEstaAsignadaAlAtleta;

      console.log(`Rutina "${rutina.nombre}" - Es del gimnasio: ${esDelGimnasio} (No es del atleta: ${noEsDelAtleta}, No está asignada: ${noEstaAsignadaAlAtleta})`);
      return esDelGimnasio;
    });

    console.log('Rutinas del entrenador:', this.rutinasDelEntrenador);
    console.log('Rutinas del gimnasio:', this.rutinasDelGimnasio);
    console.log('Rutinas del atleta:', this.rutinasDelAtleta);
  }

  verDetallesRutina(id_rutina: number): void {
    this.router.navigate(['/rutinas/visor-rutina', id_rutina]);
  }
}
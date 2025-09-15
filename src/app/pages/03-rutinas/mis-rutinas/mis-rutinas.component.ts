import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth/auth.service';
import { AtletaService } from '../../../service/atleta.service';
import { RutinasService } from '../../../service/rutinas.service'; // Add missing import
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonaService } from '../../../service/persona.service';
import { forkJoin } from 'rxjs';

// Add import for plan interface - adjust path as needed
// import { plan } from '../../../data/interfaces/planInterface';

@Component({
  selector: 'app-mis-rutinas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-rutinas.component.html',
  styleUrls: ['./mis-rutinas.component.css']
})
export class MisRutinasComponent implements OnInit {

  idAtletaSeleccionado: number | null = null;
  id_atleta: number | null = null;
  id_entrenador: number | null = null;
  id_gimnasio: number | null = null;
  id_persona: number | null = null;
  id_acceso: number | null = null;
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
  rutinasGenericasEntrenador: any[] = [];
  rutinasGenericasGimnasio: any[] = [];
  rutinasGenericasApp: any[] = [];

  constructor(
    private authService: AuthService,
    private atletaService: AtletaService,
    private dialog: MatDialog,
    private rutinaService: RutinasService,
    private router: Router,
    private personaService: PersonaService,
  ) { }

  ngOnInit(): void {
    this.id_persona = this.authService.getUserId();
    this.id_acceso = this.authService.getIdAcceso();

    if (this.id_acceso === 4) {
      // Solo gimnasio, no atleta
      this.rutinaService.getRutinaByIdCreador(this.id_persona!).subscribe({
        next: (data: any[]) => {
          this.rutinas = data.map(plan => plan.rutina);
          this.categorizarRutinas();
        },
        error: (error) => {
          console.error('Error al cargar rutinas del creador', error);
        }
      });
    } else {
      // Atleta o entrenador (o ambos)
      this.atletaService.getAtletasPorIdPersona(this.id_persona!).subscribe({
        next: (atleta) => {
          if (atleta) {
            this.id_atleta = atleta.id_atleta;
            this.id_entrenador = atleta.id_entrenador;
            this.id_gimnasio = atleta.id_gimnasio;

            if (this.id_acceso === 2) {
              // Entrenador que también es atleta
              forkJoin([
                this.rutinaService.getRutinaByIdCreador(this.id_persona!),
                this.rutinaService.getRutinaByIdAtleta(
                  this.id_atleta!,
                  this.id_entrenador ?? 0,
                  this.id_gimnasio ?? 0
                )
              ]).subscribe({
                next: ([creadas, asignadas]: [any[], any[]]) => {
                  const todas = [
                    ...creadas.map(plan => plan.rutina),
                    ...asignadas.map(plan => plan.rutina)
                  ];
                  this.rutinas = todas.filter(
                    (rutina, index, self) =>
                      index === self.findIndex(r => r.id_rutina === rutina.id_rutina)
                  );
                  this.categorizarRutinas();
                },
                error: (error) => {
                  console.error('Error al cargar rutinas', error);
                }
              });
            } else {
              // Solo atleta
              this.rutinaService.getRutinaByIdAtleta(
                this.id_atleta!,
                this.id_entrenador ?? 0,
                this.id_gimnasio ?? 0
              ).subscribe({
                next: (data: any[]) => {
                  this.rutinas = data.map(plan => plan.rutina);
                  this.categorizarRutinas();
                },
                error: (error) => {
                  console.error('Error al cargar rutinas', error);
                }
              });
            }
          } else if (this.id_acceso === 2) {
            // Solo entrenador, no atleta
            this.rutinaService.getRutinaByIdCreador(this.id_persona!).subscribe({
              next: (data: any[]) => {
                this.rutinas = data.map(plan => plan.rutina);
                this.categorizarRutinas();
              },
              error: (error) => {
                console.error('Error al cargar rutinas del creador', error);
              }
            });
          }
        },
        error: (err) => {
          console.error('Error al obtener el atleta:', err);
        }
      });
    }
  }

  // Método para categorizar rutinas según el creador
  categorizarRutinas(): void {
    // Rutinas propias (id_creador = id_persona)
    this.rutinasDelAtleta = this.rutinas.filter(rutina =>
      Number(rutina.id_creador) === Number(this.id_persona)
    );

    // Rutinas asignadas por entrenador (id_creador = id_entrenador & rutina.id_atleta = id_atleta)
    this.rutinasDelEntrenador = this.rutinas.filter(rutina =>
      Number(rutina.id_creador) === Number(this.id_entrenador) &&
      Number(rutina.id_atleta) === Number(this.id_atleta) && Number(rutina.id_creador !== 0)
    );

    // Rutinas asignadas por gimnasio (id_creador = id_gimnasio & rutina.id_atleta = id_atleta)
    this.rutinasDelGimnasio = this.rutinas.filter(rutina =>
      Number(rutina.id_creador) === Number(this.id_gimnasio) &&
      Number(rutina.id_atleta) === Number(this.id_atleta) && Number(rutina.id_creador !== 0)
    );

    // Rutinas genéricas de entrenador (id_creador = id_entrenador & rutina.id_atleta = 0)
    this.rutinasGenericasEntrenador = this.rutinas.filter(rutina =>
      Number(rutina.id_creador) === Number(this.id_entrenador) &&
      Number(rutina.id_atleta) === 0 && Number(rutina.id_creador !== 0)
    );

    // Rutinas genéricas de gimnasio (id_creador = id_gimnasio & rutina.id_atleta = 0)
    this.rutinasGenericasGimnasio = this.rutinas.filter(rutina =>
      Number(rutina.id_creador) === Number(this.id_gimnasio) &&
      Number(rutina.id_atleta) === 0 && Number(rutina.id_creador !== 0)
    );

    // Rutinas de la app (id_creador = 0 & rutina.id_atleta = 0)
    this.rutinasGenericasApp = this.rutinas.filter(rutina =>
      Number(rutina.id_creador) === 0 &&
      Number(rutina.id_atleta) === 0
    );
  }

  verDetallesRutina(id_rutina: number): void {
    this.router.navigate(['/rutinas/visor-rutina', id_rutina]);
  }

  editarRutina(id_rutina: number): void {
    this.router.navigate(['/rutinas/editar-rutina', id_rutina]);
  }
}
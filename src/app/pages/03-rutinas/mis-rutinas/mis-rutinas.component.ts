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

    // Rutinas dedicadas al atleta (id_atleta == this.id_atleta)
    this.rutinasDelAtleta = this.rutinas.filter(rutina =>
      Number(rutina.id_creador) === Number(this.id_persona)
    );

    // Rutinas dedicadas al atleta (id_atleta == this.id_atleta y no creadas por el atleta)
    const dedicadas = this.rutinas.filter(rutina =>
      Number(rutina.id_atleta) === Number(this.id_atleta) &&
      Number(rutina.id_creador) !== Number(this.id_persona)
    );

    // Rutinas genéricas (id_atleta == 0 y no creadas por el atleta)
    const genericas = this.rutinas.filter(rutina =>
      Number(rutina.id_atleta) === 0 &&
      Number(rutina.id_creador) !== Number(this.id_persona)
    );

    // Obtén los id_creador únicos de las genéricas y dedicadas
    const idsCreadores = Array.from(new Set([...genericas, ...dedicadas].map(r => r.id_creador)));

    forkJoin(
      idsCreadores.map(id =>
        this.personaService.obtenerPersonaPorId(id)
      )
    ).subscribe((personas: any[]) => {
      const perfilPorId: { [key: number]: number } = {};
      personas.forEach(persona => {
        perfilPorId[persona.id_persona] = Number(persona.id_acceso);
        console.log(`Persona ${persona.id_persona} id_acceso: ${persona.id_acceso}`);
      });

      // Rutinas dedicadas al atleta por entrenador
      this.rutinasDelEntrenador = dedicadas.filter(rutina =>
        perfilPorId[rutina.id_creador] === 2 // 2 = Entrenador
      );

      // Rutinas dedicadas al atleta por gimnasio
      this.rutinasDelGimnasio = dedicadas.filter(rutina =>
        perfilPorId[rutina.id_creador] === 4 // 4 = Gimnasio
      );

      // Genéricas de entrenador
      this.rutinasGenericasEntrenador = genericas.filter(rutina =>
        perfilPorId[rutina.id_creador] === 2 // 2 = Entrenador
      );

      // Genéricas de gimnasio
      this.rutinasGenericasGimnasio = genericas.filter(rutina =>
        perfilPorId[rutina.id_creador] === 4 // 4 = Gimnasio
      );

      // Logs para debug
      console.log('Rutinas del atleta:', this.rutinasDelAtleta);
      console.log('Rutinas del entrenador:', this.rutinasDelEntrenador);
      console.log('Rutinas del gimnasio:', this.rutinasDelGimnasio);
      console.log('Rutinas genéricas de entrenador:', this.rutinasGenericasEntrenador);
      console.log('Rutinas genéricas de gimnasio:', this.rutinasGenericasGimnasio);
    });
  }

  verDetallesRutina(id_rutina: number): void {
    this.router.navigate(['/rutinas/visor-rutina', id_rutina]);
  }
}
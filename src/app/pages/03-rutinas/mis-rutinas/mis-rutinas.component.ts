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

  constructor(
    private authService: AuthService,
    private atletaService: AtletaService,

    private dialog: MatDialog,
    private rutinaService: RutinasService // Add missing service injection
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
            this.idAtleta!, // Use non-null assertion since we just assigned it
            this.idEntrenador ?? 0,
            this.idGimnasio ?? 0
          ).subscribe({
            next: (data: any[]) => { // Adjust type as needed - replace 'any' with 'plan'
              this.rutinas = data.map(plan => plan.rutina);
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

  verDetallesRutina(id_rutina: number): void {
    // console.log('Ver detalles de la rutina:', rutina);
    this.dialog.open(ModalVisorRutinaComponent, {
      data: id_rutina,
    });
  }
}
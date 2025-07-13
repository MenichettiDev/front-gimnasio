import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RutinasService } from '../../../service/rutinas.service';
import { AtletaService } from '../../../service/atleta.service';
import { plan, ejercicioRutina, ejerciciosPorDia, rutinaArmada } from '../../../data/interfaces/rutinaArmadaInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalVisorRutinaComponent } from '../modal-visor-rutina/modal-visor-rutina.component';

@Component({
  selector: 'app-tb-rutinas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tb-rutinas.component.html',
  styleUrls: ['./tb-rutinas.component.css']
})
export class TbRutinasComponent implements OnInit, OnChanges {
  @Input() idAtleta: number | null = null; // Recibe el ID del atleta
  rutinas: rutinaArmada[] = []; // Lista de rutinas
  idEntrenador: number | null = null; // ID del entrenador
  idGimnasio: number | null = null; // ID del gimnasio

  constructor(
    private rutinaService: RutinasService,
    private atletaService: AtletaService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.idAtleta) {
      this.cargarRutinas(this.idAtleta);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Detecta cambios en la propiedad `idAtleta`
    if (changes['idAtleta'] && this.idAtleta !== null) {
      this.cargarRutinas(this.idAtleta);
    }
  }

  cargarRutinas(idAtleta: number): void {
    // Usar el ID de la persona para obtener el entrenador correspondiente
    // CORRECCIÓN: usar idAtleta (parámetro) en lugar de this.idAtleta
    this.atletaService.getAtletasPorIdPersona(idAtleta).subscribe({
      next: (atleta) => {
        if (atleta) {
          console.log('atleta completo: ', atleta);
          this.idAtleta = atleta.id_atleta;
          this.idEntrenador = atleta.id_entrenador;
          this.idGimnasio = atleta.id_gimnasio;
          console.log('ID del atleta:', this.idAtleta);

          // Cargar rutinas, pasando null si no existen entrenador o gimnasio
          this.rutinaService.getRutinaByIdAtleta(
            this.idAtleta, // Usar el id_atleta obtenido del servicio
            this.idEntrenador ?? 0,
            this.idGimnasio ?? 0
          ).subscribe({
            next: (data: plan[]) => {
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
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RutinasService } from '../../../service/rutinas.service';
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

  constructor(
    private rutinaService: RutinasService,
    private router: Router,
    private dialog: MatDialog
  ) {}

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
    this.rutinaService.getRutinaByIdAtleta(idAtleta).subscribe(
      (data: plan[]) => {
        // console.log('Rutinas cargadas:', data);
        this.rutinas = data.map(plan => plan.rutina); // Extrae todas las rutinas
      },
      (error) => {
        console.error('Error al cargar rutinas', error);
      }
    );
  }

  verDetallesRutina(id_rutina: number): void {
    // console.log('Ver detalles de la rutina:', rutina);
    this.dialog.open(ModalVisorRutinaComponent, {
      data: id_rutina,
    });
  }
}
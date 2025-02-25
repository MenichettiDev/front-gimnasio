import { Component, Input, OnInit } from '@angular/core';
import { RutinasService } from '../../service/rutinas.service';
import { plan, ejercicioRutina,ejerciciosPorDia,rutinaArmada } from '../../data/interfaces/rutinaArmadaInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VisorRutinaComponent } from '../../pages/03-rutinas/mis-rutinas/visor-rutina/visor-rutina.component';

@Component({
  selector: 'app-tb-rutinas',
  imports: [CommonModule, FormsModule ],
  templateUrl: './tb-rutinas.component.html',
  styleUrl: './tb-rutinas.component.css'
})
export class TbRutinasComponent implements OnInit {
  @Input() idAtleta: number | null = null; // Recibe el ID del atleta
  rutinas: rutinaArmada[] = []; // Lista de rutinas

  constructor(private rutinaService: RutinasService, private router: Router, private dialog : MatDialog) {}

  ngOnInit(): void {
    if (this.idAtleta) {
      this.cargarRutinas(this.idAtleta);
    }
  }

  cargarRutinas(idAtleta: number): void {
    this.rutinaService.getRutinaByIdAtleta(idAtleta).subscribe(
      (data: plan[]) => {
        this.rutinas = data.map(plan => plan.rutina); // Extrae todas las rutinas
      },
      (error) => {
        console.error('Error al cargar rutinas', error);
      }
    );
  }

  verDetallesRutina(rutina: rutinaArmada): void {
    this.dialog.open(VisorRutinaComponent, {
      data: rutina,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RutinasService } from '../../../service/rutinas.service';
import { plan } from '../../../data/interfaces/rutinaArmadaInterface';
import { VisorRutinaComponent } from "../../../components/Rutinas/visor-rutina/visor-rutina.component";

@Component({
  selector: 'app-favoritas',
  imports: [VisorRutinaComponent],
  templateUrl: './favoritas.component.html',
  styleUrl: './favoritas.component.css'
})
export class FavoritasComponent implements OnInit {

  rutinaCruda: plan | null = null;

  constructor(private rutinasService: RutinasService) {}

  ngOnInit(): void {
    const idAtleta = 2; // Reemplaza con el id_atleta dinámico si es necesario
    this.obtenerRutinas(idAtleta);
  }

  obtenerRutinas(idAtleta: number): void {
    this.rutinasService.getRutinaByIdAtleta(idAtleta).subscribe(
      (data: plan[]) => {
        if (data.length > 0) {
          this.rutinaCruda = data[0]; // Asigna los datos crudos
        } else {
          console.warn('No se encontraron rutinas para el atleta.');
        }
      },
      (error) => {
        console.error('Error al obtener las rutinas:', error);
      }
    );
  }
}

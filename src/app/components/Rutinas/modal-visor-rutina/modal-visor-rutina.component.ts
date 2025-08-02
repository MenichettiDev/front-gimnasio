import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { plan } from '../../../data/interfaces/rutinaArmadaInterface';
import { RutinasService } from '../../../service/rutinas.service';
import { VisorRutinaComponent } from '../visor-rutina/visor-rutina.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-visor-rutina',
  imports: [VisorRutinaComponent, CommonModule],
  templateUrl: './modal-visor-rutina.component.html',
  styleUrl: './modal-visor-rutina.component.css'
})
export class ModalVisorRutinaComponent {

  rutinaCruda: plan | null = null; // Almacena los datos de la rutina encontrada

  constructor(
    private rutinasService: RutinasService,
    @Inject(MAT_DIALOG_DATA) public data: number // Recibe el id_rutina desde el modal
  ) { }

  ngOnInit(): void {
    const id_rutina = this.data; // Extrae el id_rutina del MAT_DIALOG_DATA
    if (id_rutina) {
      this.obtenerRutinaPorId(id_rutina); // Busca la rutina por su ID
    } else {
      console.error('No se proporcionó un ID de rutina válido.');
    }
  }

  obtenerRutinaPorId(id_rutina: number): void {
    this.rutinasService.getRutinaByIdRutina(id_rutina).subscribe(
      (rutina: plan) => {
        this.rutinaCruda = rutina; // Asigna los datos de la rutina encontrada
      },
      (error) => {
        console.error('Error al obtener la rutina:', error);
      }
    );
  }
}

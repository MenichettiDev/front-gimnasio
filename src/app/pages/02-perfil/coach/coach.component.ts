import { Component, OnInit } from '@angular/core';
import { VisorMedidasComponent } from "../../../components/medidas/visor-medidas/visor-medidas.component";
import { CboAtletaComponent } from "../../../components/cbo-atleta/cbo-atleta.component";
import { Atleta } from '../../../data/interfaces/atletaInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coach',
  imports: [VisorMedidasComponent, CboAtletaComponent, CommonModule, FormsModule],
  templateUrl: './coach.component.html',
  styleUrl: './coach.component.css'
})
export class CoachComponent {


  idAtletaSeleccionado: number | null = null;

// ngOnInit(): void {
//     this.idAtletaSeleccionado = null;
// }


  // Manejar el cambio de atleta seleccionado
  onAtletaSeleccionado(value: number | Atleta): void {
    // console.log(typeof value, 'value');
    this.idAtletaSeleccionado = null;
    if (typeof value === 'number') {
      // Si el valor es un número, asignarlo directamente
      this.idAtletaSeleccionado = value;
    } else if (value && typeof value === 'object' && 'id_atleta' in value) {
      // Si el valor es un objeto Atleta, extraer el ID
      this.idAtletaSeleccionado = value.id_atleta;
    } else {
      // En caso de que no se cumpla ninguna condición, limpiar el ID
      this.idAtletaSeleccionado = null;
    }
  }
  // console.log( this.idAtletaSeleccionado, 'idAtletaSeleccionado');

}

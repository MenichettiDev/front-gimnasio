import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CboAtletaComponent } from '../../../components/cbo-atleta/cbo-atleta.component';
import { FormsModule } from '@angular/forms';
import { TbRutinasComponent } from '../../../components/tb-rutinas/tb-rutinas.component';
import { Atleta } from '../../../data/interfaces/atletaInterface';

@Component({
  selector: 'app-mis-rutinas',
  standalone: true,
  imports: [CommonModule, CboAtletaComponent, FormsModule, CommonModule, TbRutinasComponent],
  templateUrl: './mis-rutinas.component.html',
  styleUrls: ['./mis-rutinas.component.css']
})
export class MisRutinasComponent {

  idAtletaSeleccionado: number | null = null;

  onAtletaSeleccionado(value: number | Atleta): void {
    if (typeof value === 'number') {
      this.idAtletaSeleccionado = value; // Si es un número, asignarlo directamente
    } else if (value && typeof value === 'object' && 'id_atleta' in value) {
      this.idAtletaSeleccionado = value.id_atleta; // Si es un objeto Atleta, extraer el ID
    }
  }

}
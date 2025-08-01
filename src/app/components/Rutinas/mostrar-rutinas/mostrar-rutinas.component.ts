import { Component, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { plan, rutinaArmada } from '../../../data/interfaces/rutinaArmadaInterface'; // Ajusta la ruta según tu estructura
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalVisorRutinaComponent } from '../modal-visor-rutina/modal-visor-rutina.component';

@Component({
  selector: 'app-mostrar-rutinas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mostrar-rutinas.component.html',
  styleUrls: ['./mostrar-rutinas.component.css']
})
export class MostrarRutinasComponent implements OnChanges {
  @Input() planes: plan[] = []; // Recibe un array de planes como entrada
  @Input() mostrarEdicion: boolean = false; // Nuevo input para controlar la columna de edición
  @Output() editarRutinaSeleccionada = new EventEmitter<rutinaArmada>(); // Emite la rutina seleccionada al padre
  rutinasArmadas: rutinaArmada[] = []; // Array de rutinas armadas extraídas

  constructor(private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    // Verifica si la propiedad 'planes' ha cambiado
    if (changes['planes']) {
      // Extrae las rutinas armadas de los planes
      this.rutinasArmadas = this.planes.map(plan => plan.rutina);
    }
  }

  verDetallesRutina(id_rutina: number): void {
    // Abre el modal para ver los detalles de la rutina
    this.dialog.open(ModalVisorRutinaComponent, {
      data: id_rutina,
    });
  }

  editarRutina(rutina: rutinaArmada): void {
    // Emite la rutina seleccionada al padre
    this.editarRutinaSeleccionada.emit(rutina);
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { rutinaArmada } from '../../../data/interfaces/rutinaArmadaInterface'; // Ajusta la ruta según tu estructura
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
export class MostrarRutinasComponent implements OnInit {
  @Input() rutinas: rutinaArmada[] = []; // Recibe un array de rutinas como entrada

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // No es necesario cargar datos aquí, ya que se reciben por @Input
  }

  
  verDetallesRutina(id_rutina: number): void {
    // Abre el modal para ver los detalles de la rutina
    this.dialog.open(ModalVisorRutinaComponent, {
      data: id_rutina,
    });
  }
}
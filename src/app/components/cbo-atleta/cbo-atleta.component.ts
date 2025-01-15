import { Component, OnInit } from '@angular/core';
import { EntrenadorService } from '../../service/entrenador.service'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';  // Necesitamos importar NgFor para usarlo
import { FormsModule } from '@angular/forms';
import { Atleta } from '../../data/interfaces/atletaInterface';
import { AtletaService } from '../../service/atleta.service';

@Component({
  selector: 'app-cbo-atleta',
  imports: [CommonModule, FormsModule],  // Importamos NgFor para usarlo en el template
  templateUrl: './cbo-atleta.component.html',
  styleUrl: './cbo-atleta.component.css'
})
export class CboAtletaComponent {

  atletas: Atleta[] = [];  // Lista de entrenadores
  selectedAtleta: any;    // Para el valor seleccionado

  constructor(private atletaService: AtletaService) { }

  ngOnInit(): void {
    this.obtenerAtletas();
  }

  // Método para obtener los entrenadores
  obtenerAtletas(): void {
    this.atletaService.getAtletas().subscribe(
      (data) => {
        this.atletas = data.atletas;  // Asignamos los datos de los entrenadores
      },
      (error) => {
        console.error('Error al obtener entrenadores', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { GimnasioService } from '../../service/gimnasio.service'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';  // Necesitamos importar NgFor para usarlo
import { FormsModule } from '@angular/forms';
import { Gimnasio } from '../../data/interfaces/gimnasioInterface';
import { SharedGimnasioService } from '../../service/shared-gimnasio.service';

@Component({
  selector: 'app-cbo-gimnasio',
  imports: [CommonModule, FormsModule],  // Importamos NgFor para usarlo en el template
  templateUrl: './cbo-gimnasio.component.html',
  styleUrl: './cbo-gimnasio.component.css'
})
export class CboGimnasioComponent {

  gimnasios: Gimnasio[] = [];  // Lista de entrenadores
  selectedGimnasio: Gimnasio | null = null;    // Para el valor seleccionado

  constructor(
    private gimnasioService: GimnasioService,
    private sharedService: SharedGimnasioService
  ) { }

  ngOnInit(): void {
    this.obtenerGimnasios();
  }

  // Método para obtener los entrenadores
  obtenerGimnasios(): void {
    this.gimnasioService.getGimnasios().subscribe(
      (data) => {
        this.gimnasios = data;  // Asignamos los datos de los entrenadores
      },
      (error) => {
        console.error('Error al obtener gimnasios', error);
      }
    );
  }

  onGimnasioChange(event: any): void {
    if (this.selectedGimnasio) {
      // console.log('Grupo muscular seleccionado: ' + this.musculoSeleccionado.nombre);
      this.sharedService.setSelectedGimnasio(this.selectedGimnasio);
    }
  }
}

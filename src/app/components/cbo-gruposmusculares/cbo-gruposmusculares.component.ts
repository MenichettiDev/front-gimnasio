import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Necesitamos importar NgFor para usarlo
import { FormsModule } from '@angular/forms';
import { GrupoMuscular } from '../../data/interfaces/grupoMuscularInterface';
import { GruposMuscularesService } from '../../service/grupos-musculares.service';
import { SharedGrupoMuscularService } from '../../service/shared-grupo-muscular.service';

@Component({
  selector: 'app-cbo-gruposmusculares',
  imports: [CommonModule, FormsModule],  // Importamos NgFor para usarlo en el template
  templateUrl: './cbo-gruposmusculares.component.html',
  styleUrl: './cbo-gruposmusculares.component.css'
})
export class CboGruposmuscularesComponent {

  gruposMusculares: GrupoMuscular[] = [];  // Lista de entrenadores
  musculoSeleccionado: GrupoMuscular | null = null;    // Para el valor seleccionado

  constructor(
    private grupoMuscularService: GruposMuscularesService,
    private sharedService: SharedGrupoMuscularService
  ) {}
  ngOnInit(): void {
    this.obtenerGruposMusculares();
  }

  // Método para obtener los entrenadores
  obtenerGruposMusculares(): void {
    console.log('resp api ok');
    this.grupoMuscularService.getGruposMusculares().subscribe(
      (data) => {
        this.gruposMusculares = data;  // Asignamos los datos de los entrenadores
      },
      (error) => {
        console.error('Error al obtener grupos musculares', error);
      }
    );
  }

  onGrupoMuscularChange(event: any): void {
    if (this.musculoSeleccionado) {
      // console.log('Grupo muscular seleccionado: ' + this.musculoSeleccionado.nombre);
      this.sharedService.setSelectedGrupo(this.musculoSeleccionado);
    }
  }
}

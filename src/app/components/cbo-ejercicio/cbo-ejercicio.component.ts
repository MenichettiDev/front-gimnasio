import { Component, Input, OnInit } from '@angular/core';
import { SharedGrupoMuscularService } from '../../service/shared-grupo-muscular.service';
import { GrupoMuscular } from '../../data/interfaces/grupoMuscularInterface';
import { EjerciciosService } from '../../service/ejercicios.service';
import { Ejercicio } from '../../data/interfaces/ejercicioInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cbo-ejercicio',
  imports: [CommonModule, FormsModule],  // Importamos NgFor para usarlo en el template
  templateUrl: './cbo-ejercicio.component.html',
  styleUrl: './cbo-ejercicio.component.css'
})
export class CboEjercicioComponent implements OnInit {

  @Input() label: string = "Selecciona un Ejercicio";  // Para el label del combo
  grupoSeleccionado: GrupoMuscular | null = null;
  ejercicios: Ejercicio[] = []; // Cambia el tipo según tu modelo de ejercicios
  selectedEjercicio: Ejercicio | null = null; // Cambia el tipo según tu modelo de ejerc

  constructor(
    private sharedService: SharedGrupoMuscularService,
    private ejercicioService: EjerciciosService // Asegúrate de importar el servicio correct
  ) {}

  ngOnInit(): void {
    this.sharedService.selectedGrupo$.subscribe((grupo) => {
      this.grupoSeleccionado = grupo;
      console.log('grupo seleccionado: ' + grupo?.id_grupo_muscular)
      if (grupo?.id_grupo_muscular) {
        this.cargarEjercicios(grupo.id_grupo_muscular); // Cambia según tu lógica
      }
    });
  }

  cargarEjercicios(id_grupo_muscular: number): void {
    this.ejercicioService.getEjercicioPorGrupoMuscular( id_grupo_muscular ).subscribe(
      (data) => {
        this.ejercicios = data;  // Asignamos los datos de los entrenadores
      },
      (error) => {
        console.error('Error al obtener ejercicios', error);
      }
    );
  }
  
}

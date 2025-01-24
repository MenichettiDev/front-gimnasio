import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GrupoMuscular } from '../../data/interfaces/grupoMuscularInterface';
import { GruposMuscularesService } from '../../service/grupos-musculares.service';
import { SharedGrupoMuscularService } from '../../service/shared-grupo-muscular.service';

@Component({
  selector: 'app-cbo-gruposmusculares',
  imports: [CommonModule, FormsModule],
  templateUrl: './cbo-gruposmusculares.component.html',
  styleUrl: './cbo-gruposmusculares.component.css'
})
export class CboGruposmuscularesComponent implements OnInit {
  @Input() label: string = 'Selecciona un Grupo Muscular'; // Label opcional
  @Output() valueChange = new EventEmitter<GrupoMuscular>(); // Para emitir el valor al padre

  gruposMusculares: GrupoMuscular[] = []; // Lista de grupos musculares
  musculoSeleccionado: GrupoMuscular | null = null; // Valor seleccionado

  constructor(
    private grupoMuscularService: GruposMuscularesService,
    private sharedService: SharedGrupoMuscularService
  ) {}

  ngOnInit(): void {
    this.obtenerGruposMusculares();
  }

  obtenerGruposMusculares(): void {
    this.grupoMuscularService.getGruposMusculares().subscribe(
      (data) => {
        this.gruposMusculares = data; // Llenar el combo
      },
      (error) => {
        console.error('Error al obtener grupos musculares', error);
      }
    );
  }

  onGrupoMuscularChange(): void {
    if (this.musculoSeleccionado) {
      this.valueChange.emit(this.musculoSeleccionado); // Emitir el objeto seleccionado
      this.sharedService.setSelectedGrupo(this.musculoSeleccionado); // Actualizar el servicio compartido
    }
  }

  
}

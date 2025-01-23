import { Component, Input, OnInit } from '@angular/core';
import { SharedGimnasioService } from '../../service/shared-gimnasio.service';
import { Gimnasio } from '../../data/interfaces/gimnasioInterface';
import { MembresiaService } from '../../service/membresia.service';
import { Membresia } from '../../data/interfaces/membresiaInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cbo-membresia',
  imports: [CommonModule, FormsModule],  // Importamos NgFor para usarlo en el template
  templateUrl: './cbo-membresia.component.html',
  styleUrl: './cbo-membresia.component.css'
})
export class CboMembresiaComponent {

  @Input() label: string = "Selecciona una Membresía";  // Para el label del combo
  gimnasioSeleccionado: Gimnasio | null = null;
  membresias: Membresia[] = []; // Cambia el tipo según tu modelo de ejercicios
  selectedMembresia: Membresia | null = null; // Cambia el tipo según tu modelo de ejerc

  constructor(
    private sharedService: SharedGimnasioService,
    private membresiaService: MembresiaService // Asegúrate de importar el servicio correct
  ) {}

  ngOnInit(): void {
    this.sharedService.selectedGimnasio$.subscribe((gimnasio) => {
      this.gimnasioSeleccionado = gimnasio;
      console.log('grupo seleccionado: ' + gimnasio)
      if (gimnasio) {
        this.cargarMembresias(gimnasio.id_gimnasio); // Cambia según tu lógica
      }
    });
  }

  cargarMembresias(id_gimnasio: number): void {
    this.membresiaService.getMembresiasByIdGimnasio( id_gimnasio ).subscribe(
      (data) => {
        this.membresias = data;  // Asignamos los datos de los entrenadores
      },
      (error) => {
        console.error('Error al obtener ejercicios', error);
      }
    );
  }
  
}

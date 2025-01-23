import { Component, Input } from '@angular/core';// Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';  // Necesitamos importar NgFor para usarlo
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cbo-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './cbo-perfil.component.html',
  styleUrl: './cbo-perfil.component.css'
})
export class CboPerfilComponent {

@Input() label: string = "Selecciona el perfil";  // Para el label del combo

  perfiles = [
    { id_perfil: 1, nombre: 'Admin'},
    { id_perfil: 2, nombre: 'Entrenador' },
    { id_perfil: 3, nombre: 'Atleta' },
    { id_perfil: 3, nombre: 'Visita' }
  ];

  // Variable para almacenar el atleta seleccionado
  selectedPerfil: number | null = null;

  constructor() { }


}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PerfilOption {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  color: string;
}

@Component({
  selector: 'app-modal-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.css']
})
export class ModalPerfilComponent {
  @Input() visible: boolean = false;
  @Output() perfilSelected = new EventEmitter<number>();
  @Output() cancel = new EventEmitter<void>();

  selectedPerfil: number | null = null;

  perfilOptions: PerfilOption[] = [
    {
      id: 2,
      nombre: 'Entrenador',
      descripcion: 'Crea rutinas, gestiona atletas y supervisa entrenamientos',
      icono: 'bx bx-dumbbell',
      color: '#FF6B35'
    },
    {
      id: 3,
      nombre: 'Atleta',
      descripcion: 'Sigue rutinas, registra progreso y alcanza tus metas',
      icono: 'bx bx-run',
      color: '#4ECDC4'
    },
    {
      id: 4,
      nombre: 'Gimnasio',
      descripcion: 'Administra tu gimnasio, entrenadores y membresías',
      icono: 'bx bx-building',
      color: '#45B7D1'
    }
  ];

  selectPerfil(perfilId: number): void {
    this.selectedPerfil = perfilId;
  }

  confirmSelection(): void {
    if (this.selectedPerfil) {
      this.perfilSelected.emit(this.selectedPerfil);
      this.selectedPerfil = null;
    }
  }

  cancelSelection(): void {
    this.selectedPerfil = null;
    this.cancel.emit();
  }
}
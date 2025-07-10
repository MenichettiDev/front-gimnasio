import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalPerfilComponent } from '../modal-perfil/modal-perfil.component';

@Component({
  selector: 'app-seleccionar-perfil',
  standalone: true,
  imports: [ModalPerfilComponent],
  template: `
    <app-modal-perfil 
      [visible]="true"
      (perfilSelected)="onPerfilSelected($event)"
      (cancel)="onCancel()">
    </app-modal-perfil>
  `
})
export class SeleccionarPerfilComponent {
  constructor(private router: Router) { }

  onPerfilSelected(perfilId: number) {
    switch (perfilId) {
      case 2: // Entrenador
        this.router.navigate(['/registro-entrenador']);
        break;
      case 3: // Atleta
        this.router.navigate(['/registro-atleta']);
        break;
      case 4: // Gimnasio
        this.router.navigate(['/registro-gimnasio']);
        break;
      default:
        console.error('Perfil no válido');
    }
  }

  onCancel() {
    this.router.navigate(['/login']);
  }
}
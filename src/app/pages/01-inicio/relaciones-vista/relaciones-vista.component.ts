import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { RelacionesService } from '../../../service/relaciones.service';
import { CommonModule } from '@angular/common';
import { ModalToastComponent } from '../../../components/modal/modal-toast/modal-toast.component';

@Component({
  selector: 'app-relaciones-vista',
  templateUrl: './relaciones-vista.component.html',
  styleUrls: ['./relaciones-vista.component.css'],
  imports: [CommonModule, ModalToastComponent]
})
export class RelacionesVistaComponent implements OnInit {
  perfil: number | null = null;
  relaciones: any = {};
  mensaje: string = '';

  // Toast control
  toastVisible: boolean = false;
  toastMessage: string = '';
  toastType: string = 'success';

  constructor(
    private authService: AuthService,
    private relacionesService: RelacionesService
  ) { }

  ngOnInit() {
    this.perfil = this.authService.getIdAcceso();
    if (this.perfil === 3) { // atleta
      const idAtleta = this.authService.getIdAtleta();
      if (idAtleta) {
        this.relacionesService.getRelacionesActivasAtleta(idAtleta).subscribe(
          res => this.relaciones = res,
          err => this.showToast('Error al cargar relaciones activas.', 'error')
        );
      }
    }
    if (this.perfil === 2) { // entrenador
      const idEntrenador = this.authService.getIdEntrenador();
      if (idEntrenador) {
        this.relacionesService.getRelacionesActivasEntrenador(idEntrenador).subscribe(
          res => this.relaciones = res,
          err => this.showToast('Error al cargar relaciones activas.', 'error')
        );
      }
    }
    if (this.perfil === 4) { // gimnasio
      const idGimnasio = this.authService.getIdGimnasio();
      if (idGimnasio) {
        this.relacionesService.getRelacionesActivasGimnasio(idGimnasio).subscribe(
          res => this.relaciones = res,
          err => this.showToast('Error al cargar relaciones activas.', 'error')
        );
      }
    }
  }

  eliminarRelacion(tipo: string, relacion: any) {
    if (tipo === 'gimnasio' && relacion.id) {
      this.relacionesService.eliminarRelacionAtletaGimnasio(relacion.id).subscribe(
        () => {
          this.showToast('Relación eliminada correctamente.', 'success');
          this.ngOnInit();
        },
        err => this.showToast('Error al eliminar relación.', 'error')
      );
    }
    if (tipo === 'entrenador' && relacion.id) {
      this.relacionesService.eliminarRelacionAtletaEntrenador(relacion.id).subscribe(
        () => {
          this.showToast('Relación eliminada correctamente.', 'success');
          this.ngOnInit();
        },
        err => this.showToast('Error al eliminar relación.', 'error')
      );
    }
    if (tipo === 'gimnasio-entrenador' && relacion.id) {
      this.relacionesService.eliminarRelacionEntrenadorGimnasio(relacion.id).subscribe(
        () => {
          this.showToast('Relación eliminada correctamente.', 'success');
          this.ngOnInit();
        },
        err => this.showToast('Error al eliminar relación.', 'error')
      );
    }
  }

  showToast(message: string, type: string = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 2500);
  }
}

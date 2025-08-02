import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { RelacionesService } from '../../../service/relaciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relaciones-vista',
  templateUrl: './relaciones-vista.component.html',
  styleUrls: ['./relaciones-vista.component.css'],
  imports: [CommonModule]
})
export class RelacionesVistaComponent implements OnInit {
  perfil: number | null = null;
  relaciones: any = {};
  mensaje: string = '';

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
          err => this.mensaje = 'Error al cargar relaciones activas.'
        );
      }
    }
    if (this.perfil === 2) { // entrenador
      const idEntrenador = this.authService.getIdEntrenador();
      if (idEntrenador) {
        this.relacionesService.getRelacionesActivasEntrenador(idEntrenador).subscribe(
          res => this.relaciones = res,
          err => this.mensaje = 'Error al cargar relaciones activas.'
        );
      }
    }
    if (this.perfil === 4) { // gimnasio
      const idGimnasio = this.authService.getIdGimnasio();
      if (idGimnasio) {
        this.relacionesService.getRelacionesActivasGimnasio(idGimnasio).subscribe(
          res => this.relaciones = res,
          err => this.mensaje = 'Error al cargar relaciones activas.'
        );
      }
    }
  }

  eliminarRelacion(tipo: string, relacion: any) {
    if (tipo === 'gimnasio' && relacion.id) {
      this.relacionesService.eliminarRelacionAtletaGimnasio(relacion.id).subscribe(
        () => this.ngOnInit(),
        err => this.mensaje = 'Error al eliminar relación.'
      );
    }
    if (tipo === 'entrenador' && relacion.id) {
      this.relacionesService.eliminarRelacionAtletaEntrenador(relacion.id).subscribe(
        () => this.ngOnInit(),
        err => this.mensaje = 'Error al eliminar relación.'
      );
    }
    if (tipo === 'gimnasio-entrenador' && relacion.id) {
      this.relacionesService.eliminarRelacionEntrenadorGimnasio(relacion.id).subscribe(
        () => this.ngOnInit(),
        err => this.mensaje = 'Error al eliminar relación.'
      );
    }
  }
}

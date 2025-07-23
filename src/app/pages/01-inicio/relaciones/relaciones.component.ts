import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { AtletaService } from '../../../service/atleta.service';
import { EntrenadorService } from '../../../service/entrenador.service';
import { GimnasioService } from '../../../service/gimnasio.service';
import { RelacionesService } from '../../../service/relaciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-relaciones',
  templateUrl: './relaciones.component.html',
  styleUrls: ['./relaciones.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RelacionesComponent implements OnInit {
  perfil: number | null = null;
  // Datos para selects
  entrenadores: any[] = [];
  gimnasios: any[] = [];
  solicitudesPendientes: any[] = [];
  // Formulario
  selectedEntrenador: number | null = null;
  selectedGimnasio: number | null = null;
  // Mensajes
  mensaje: string = '';

  constructor(
    private authService: AuthService,
    private atletaService: AtletaService,
    private entrenadorService: EntrenadorService,
    private gimnasioService: GimnasioService,
    private relacionesService: RelacionesService
  ) { }

  ngOnInit() {
    this.perfil = this.authService.getIdAcceso();
    // Cargar datos según perfil
    if (this.perfil === 2 || this.perfil === 1) {
      this.cargarGimnasios();
      this.cargarSolicitudesEntrenador();
    }
    if (this.perfil === 3) {
      this.cargarEntrenadores();
      this.cargarGimnasios();
      this.cargarSolicitudesAtleta();
    }
    if (this.perfil === 4) {
      this.cargarSolicitudesGimnasio();
    }
  }

  cargarEntrenadores() {
    this.entrenadorService.getEntrenadores().subscribe(res => {
      // res puede ser { entrenadores: [...] }
      this.entrenadores = Array.isArray(res) ? res : (res.entrenadores || []);
    });
  }

  cargarGimnasios() {
    this.gimnasioService.getGimnasios().subscribe((res) => {
      this.gimnasios = res || [];
    });
  }

  // Solicitudes pendientes según perfil
  cargarSolicitudesEntrenador() {
    const idEntrenador = this.authService.getIdEntrenador();
    if (idEntrenador) {
      this.relacionesService.getSolicitudesPendientesEntrenador(idEntrenador).subscribe(
        res => this.solicitudesPendientes = res || [],
        err => this.mensaje = 'Error al cargar solicitudes.'
      );
    }
  }

  cargarSolicitudesAtleta() {
    const idAtleta = this.authService.getIdAtleta();
    if (idAtleta) {
      this.relacionesService.getSolicitudesPendientesAtleta(idAtleta).subscribe(
        res => this.solicitudesPendientes = res || [],
        err => this.mensaje = 'Error al cargar solicitudes.'
      );
    }
  }

  cargarSolicitudesGimnasio() {
    const idGimnasio = this.authService.getIdGimnasio();
    if (idGimnasio) {
      this.relacionesService.getSolicitudesPendientesGimnasio(idGimnasio).subscribe(
        res => this.solicitudesPendientes = res || [],
        err => this.mensaje = 'Error al cargar solicitudes.'
      );
    }
  }

  // Crear solicitud de relación
  solicitarRelacion(tipo: 'gimnasio' | 'entrenador') {
    if (tipo === 'gimnasio' && this.selectedGimnasio) {
      if (this.perfil === 3) { // atleta
        const idAtleta = this.authService.getIdAtleta();
        if (idAtleta) {
          this.relacionesService.solicitarAtletaGimnasio(idAtleta, this.selectedGimnasio).subscribe(
            () => this.mensaje = 'Solicitud enviada al gimnasio.',
            err => this.mensaje = 'Error al enviar solicitud.'
          );
        }
      }
      if (this.perfil === 2) { // entrenador
        const idEntrenador = this.authService.getIdEntrenador();
        if (idEntrenador) {
          this.relacionesService.solicitarEntrenadorGimnasio(idEntrenador, this.selectedGimnasio).subscribe(
            () => this.mensaje = 'Solicitud enviada al gimnasio.',
            err => this.mensaje = 'Error al enviar solicitud.'
          );
        }
      }
    }
    if (tipo === 'entrenador' && this.selectedEntrenador && this.perfil === 3) {
      const idAtleta = this.authService.getIdAtleta();
      if (idAtleta) {
        this.relacionesService.solicitarAtletaEntrenador(idAtleta, this.selectedEntrenador).subscribe(
          () => this.mensaje = 'Solicitud enviada al entrenador.',
          err => this.mensaje = 'Error al enviar solicitud.'
        );
      }
    }
  }

  // Aceptar/rechazar solicitud
  responderSolicitud(solicitudId: number, aceptar: boolean) {
    // Determinar tipo de solicitud según perfil
    if (this.perfil === 2) { // entrenador
      this.relacionesService.responderSolicitudAtletaEntrenador(solicitudId, aceptar).subscribe(
        () => {
          this.mensaje = aceptar ? 'Solicitud aceptada.' : 'Solicitud rechazada.';
          this.cargarSolicitudesEntrenador();
        },
        err => this.mensaje = 'Error al responder solicitud.'
      );
    }
    if (this.perfil === 4) { // gimnasio
      // Aquí deberías saber si la solicitud es de atleta o entrenador
      // Ejemplo: si la solicitud tiene tipo === 'atleta'
      const solicitud = this.solicitudesPendientes.find(s => s.id === solicitudId);
      if (solicitud?.tipo === 'atleta-gimnasio') {
        this.relacionesService.responderSolicitudAtletaGimnasio(solicitudId, aceptar).subscribe(
          () => {
            this.mensaje = aceptar ? 'Solicitud aceptada.' : 'Solicitud rechazada.';
            this.cargarSolicitudesGimnasio();
          },
          err => this.mensaje = 'Error al responder solicitud.'
        );
      } else if (solicitud?.tipo === 'entrenador-gimnasio') {
        this.relacionesService.responderSolicitudEntrenadorGimnasio(solicitudId, aceptar).subscribe(
          () => {
            this.mensaje = aceptar ? 'Solicitud aceptada.' : 'Solicitud rechazada.';
            this.cargarSolicitudesGimnasio();
          },
          err => this.mensaje = 'Error al responder solicitud.'
        );
      }
    }
  }
}

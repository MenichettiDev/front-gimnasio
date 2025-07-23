import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { AtletaService } from '../../../service/atleta.service';
import { EntrenadorService } from '../../../service/entrenador.service';
import { GimnasioService } from '../../../service/gimnasio.service';
import { RelacionesService } from '../../../service/relaciones.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalToastComponent } from '../../../components/modal/modal-toast/modal-toast.component';

@Component({
  selector: 'app-relaciones',
  templateUrl: './relaciones.component.html',
  styleUrls: ['./relaciones.component.css'],
  imports: [CommonModule, FormsModule, ModalToastComponent]
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
  toastVisible: boolean = false;
  toastType: string = 'success';

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

  mostrarToast(message: string, type: string = 'success') {
    this.mensaje = message;
    this.toastType = type;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 3000);
  }

  // Crear solicitud de relación
  solicitarRelacion(tipo: 'gimnasio' | 'entrenador') {
    if (tipo === 'gimnasio' && this.selectedGimnasio) {
      if (this.perfil === 3) { // atleta
        const idAtleta = this.authService.getIdAtleta();
        if (idAtleta) {
          this.relacionesService.solicitarAtletaGimnasio(idAtleta, this.selectedGimnasio).subscribe(
            res => this.mostrarToast(res.message || (res.success ? 'Solicitud enviada al gimnasio.' : 'Error al enviar solicitud.'), res.success ? 'success' : 'error'),
            err => this.mostrarToast('Error al enviar solicitud.', 'error')
          );
        }
      }
      if (this.perfil === 2) { // entrenador
        const idEntrenador = this.authService.getIdEntrenador();
        if (idEntrenador) {
          this.relacionesService.solicitarEntrenadorGimnasio(idEntrenador, this.selectedGimnasio).subscribe(
            res => this.mostrarToast(res.message || (res.success ? 'Solicitud enviada al gimnasio.' : 'Error al enviar solicitud.'), res.success ? 'success' : 'error'),
            err => this.mostrarToast('Error al enviar solicitud.', 'error')
          );
        }
      }
    }
    if (tipo === 'entrenador' && this.selectedEntrenador && this.perfil === 3) {
      const idAtleta = this.authService.getIdAtleta();
      if (idAtleta) {
        this.relacionesService.solicitarAtletaEntrenador(idAtleta, this.selectedEntrenador).subscribe(
          res => this.mostrarToast(res.message || (res.success ? 'Solicitud enviada al entrenador.' : 'Error al enviar solicitud.'), res.success ? 'success' : 'error'),
          err => this.mostrarToast('Error al enviar solicitud.', 'error')
        );
      }
    }
  }

  // Aceptar/rechazar solicitud
  responderSolicitud(solicitudId: number, aceptar: boolean) {
    // Determinar tipo de solicitud según perfil
    if (this.perfil === 2) { // entrenador
      this.relacionesService.responderSolicitudAtletaEntrenador(solicitudId, aceptar).subscribe(
        res => {
          this.mostrarToast(
            res?.message || (aceptar ? 'Solicitud aceptada.' : 'Solicitud rechazada.'),
            aceptar ? 'success' : 'error'
          );
          this.cargarSolicitudesEntrenador();
        },
        err => this.mostrarToast('Error al responder solicitud.', 'error')
      );
    }
    if (this.perfil === 4) { // gimnasio
      const solicitud = this.solicitudesPendientes.find(s => s.id === solicitudId);
      if (solicitud?.tipo === 'atleta-gimnasio') {
        this.relacionesService.responderSolicitudAtletaGimnasio(solicitudId, aceptar).subscribe(
          res => {
            this.mostrarToast(
              res?.message || (aceptar ? 'Solicitud aceptada.' : 'Solicitud rechazada.'),
              aceptar ? 'success' : 'error'
            );
            this.cargarSolicitudesGimnasio();
          },
          err => this.mostrarToast('Error al responder solicitud.', 'error')
        );
      } else if (solicitud?.tipo === 'entrenador-gimnasio') {
        this.relacionesService.responderSolicitudEntrenadorGimnasio(solicitudId, aceptar).subscribe(
          res => {
            this.mostrarToast(
              res?.message || (aceptar ? 'Solicitud aceptada.' : 'Solicitud rechazada.'),
              aceptar ? 'success' : 'error'
            );
            this.cargarSolicitudesGimnasio();
          },
          err => this.mostrarToast('Error al responder solicitud.', 'error')
        );
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelacionesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Solicitar relación atleta-entrenador
  // Envía una solicitud para vincular un atleta con un entrenador (crea registro pendiente en tb_atleta_entrenador).
  solicitarAtletaEntrenador(id_atleta: number, id_entrenador: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/solicitar-atleta-entrenador`, { id_atleta, id_entrenador })
      .pipe(catchError(this.handleError));
  }

  // Solicitar relación atleta-gimnasio
  // Envía una solicitud para vincular un atleta con un gimnasio (crea registro pendiente en tb_atleta_gimnasio).
  solicitarAtletaGimnasio(id_atleta: number, id_gimnasio: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/solicitar-atleta-gimnasio`, { id_atleta, id_gimnasio })
      .pipe(catchError(this.handleError));
  }

  // Solicitar relación entrenador-gimnasio
  // Envía una solicitud para vincular un entrenador con un gimnasio (crea registro pendiente en tb_entrenador_gimnasio).
  solicitarEntrenadorGimnasio(id_entrenador: number, id_gimnasio: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/solicitar-entrenador-gimnasio`, { id_entrenador, id_gimnasio })
      .pipe(catchError(this.handleError));
  }

  // Obtener solicitudes pendientes para entrenador
  // Devuelve las solicitudes que atletas han hecho para vincularse con este entrenador y están pendientes de aceptación.
  getSolicitudesPendientesEntrenador(id_entrenador: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/solicitudes-pendientes-entrenador`, { id_entrenador })
      .pipe(catchError(this.handleError));
  }

  // Obtener solicitudes pendientes para atleta
  // Devuelve las solicitudes que gimnasios/entrenadores han hecho para vincularse con este atleta y están pendientes de aceptación.
  getSolicitudesPendientesAtleta(id_atleta: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/solicitudes-pendientes-atleta`, { id_atleta })
      .pipe(catchError(this.handleError));
  }

  // Obtener solicitudes pendientes para gimnasio
  // Devuelve las solicitudes que atletas/entrenadores han hecho para vincularse con este gimnasio y están pendientes de aceptación.
  getSolicitudesPendientesGimnasio(id_gimnasio: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/solicitudes-pendientes-gimnasio`, { id_gimnasio })
      .pipe(catchError(this.handleError));
  }

  // Aceptar/rechazar solicitud atleta-entrenador
  // Permite al entrenador aceptar o rechazar la solicitud de relación con un atleta (actualiza el campo activo en tb_atleta_entrenador).
  responderSolicitudAtletaEntrenador(id: number, activo: boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/responder-atleta-entrenador`, { id, activo })
      .pipe(catchError(this.handleError));
  }

  // Aceptar/rechazar solicitud atleta-gimnasio
  // Permite al gimnasio aceptar o rechazar la solicitud de relación con un atleta (actualiza el campo activo en tb_atleta_gimnasio).
  responderSolicitudAtletaGimnasio(id: number, activo: boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/responder-atleta-gimnasio`, { id, activo })
      .pipe(catchError(this.handleError));
  }

  // Aceptar/rechazar solicitud entrenador-gimnasio
  // Permite al gimnasio aceptar o rechazar la solicitud de relación con un entrenador (actualiza el campo activo en tb_entrenador_gimnasio).
  responderSolicitudEntrenadorGimnasio(id: number, activo: boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/responder-entrenador-gimnasio`, { id, activo })
      .pipe(catchError(this.handleError));
  }

  // Obtener relaciones activas de un atleta (gimnasios y entrenadores)
  getRelacionesActivasAtleta(id_atleta: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/relaciones-activas-atleta`, { id_atleta })
      .pipe(catchError(this.handleError));
  }

  // Obtener relaciones activas de un entrenador (atletas y gimnasios)
  getRelacionesActivasEntrenador(id_entrenador: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/relaciones-activas-entrenador`, { id_entrenador })
      .pipe(catchError(this.handleError));
  }

  // Obtener relaciones activas de un gimnasio (atletas y entrenadores)
  getRelacionesActivasGimnasio(id_gimnasio: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/relaciones-activas-gimnasio`, { id_gimnasio })
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores
  // Centraliza el manejo de errores para todas las peticiones HTTP del service.
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
    let errorMessage = 'Ocurrió un error inesperado.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}

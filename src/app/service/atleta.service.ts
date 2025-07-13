import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, of, throwError } from 'rxjs';
import { Atleta } from '../data/interfaces/atletaInterface';
import { catchError } from 'rxjs';
import { environment } from '../../environments/environment'; // Importa las variables de entorno
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AtletaService {
  private apiUrl = environment.apiUrl; // Usa la URL del entorno
  private apiUrlGetAtletas = `${this.apiUrl}/getAtletas`; // URL para obtener todos los atletas
  private apiUrlGetAtletaByIdPersona = `${this.apiUrl}/getAtletaByIdPersona`; // URL para obtener atletas por ID de persona
  private apiUrlGetAtletaByIdEntrenador = `${this.apiUrl}/getAtletaByIdEntrenador`; // URL para obtener atletas por ID
  private apiUrlGetAtletaByIdGimnasio = `${this.apiUrl}/getAtletaByIdGimnasio`; // URL para obtener atletas por ID
  private apiUrlCrearAtleta = `${this.apiUrl}/crearAtleta`; // URL para crear un atleta
  private apiUrlEditarAtleta = `${this.apiUrl}/editarAtleta`; // URL para editar un atleta

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Método para obtener todos los atletas
  getAtletas(): Observable<{ atletas: Atleta[] }> {
    return this.http.get<{ atletas: Atleta[] }>(this.apiUrlGetAtletas).pipe(
      catchError(this.handleError)
    );
  }


  getAtletasPorPerfil(): Observable<any> {
    const userProfile = this.authService.getIdAcceso();

    console.log('Perfil de usuario:', userProfile);

    switch (userProfile) {
      case 1: // admin
        return this.getAtletas(); // Todos los atletas  

      case 2: // entrenador
        const idEntrenador = this.authService.getIdEntrenador();
        console.log('ID Entrenador:', idEntrenador);
        if (idEntrenador) {
          return this.getAtletasPorEntrenador(idEntrenador); // Sus atletas
        }
        return of({ atletas: [] });

      case 3: // atleta
        const idPersonaAtleta = this.authService.getUserId();
        console.log('ID Persona (Atleta):', idPersonaAtleta);
        if (idPersonaAtleta) {
          return this.getAtletasPorIdPersona(idPersonaAtleta).pipe(
            map(atleta => {
              console.log('Atleta obtenido:', atleta);
              return { atletas: atleta ? [atleta] : [] };
            }),
            catchError(error => {
              console.error('Error obteniendo atleta:', error);
              return of({ atletas: [] });
            })
          );
        }
        return of({ atletas: [] });

      case 4: // gimnasio
        const idGimnasio = this.authService.getIdGimnasio();
        console.log('ID Gimnasio:', idGimnasio);
        if (idGimnasio) {
          return this.getAtletasPorGimnasio(idGimnasio); // Atletas de su gimnasio
        }
        return of({ atletas: [] });

      default:
        console.warn('Perfil no reconocido:', userProfile);
        return of({ atletas: [] }); // Lista vacía por defecto
    }
  }


  // Nuevo método para atletas por gimnasio
  getAtletasPorGimnasio(id_gimnasio: number): Observable<{ atletas: Atleta[] }> {
    return this.http.post<{ atletas: Atleta[] }>(this.apiUrlGetAtletaByIdGimnasio, { id_gimnasio }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener un atleta específico
  getAtletaPorId(idAtleta: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/atletas/${idAtleta}`).pipe(
      map(atleta => ({ atletas: [atleta] })) // Formato consistente
    );
  }

  // Método para obtener atletas por ID de entrenador
  getAtletasPorEntrenador(id_entrenador: number): Observable<{ atletas: Atleta[] }> {
    return this.http.post<{ atletas: Atleta[] }>(this.apiUrlGetAtletaByIdEntrenador, { id_entrenador }).pipe(
      catchError(this.handleError)
    );
  }

  getAtletasPorIdPersona(id_persona: number): Observable<Atleta> {
    return this.http.post<Atleta>(this.apiUrlGetAtletaByIdPersona, { id_persona }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear un atleta
  crearAtleta(atletaData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlCrearAtleta, atletaData).pipe(
      catchError(this.handleError)
    );
  }


  // Método para editar un atleta
  editarAtleta(idAtleta: number, atletaData: Partial<Atleta>): Observable<any> {
    const url = `${this.apiUrlEditarAtleta}/${idAtleta}`;
    return this.http.put<any>(url, atletaData).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
    let errorMessage = 'Ocurrió un error inesperado.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Entrenador } from '../data/interfaces/entrenadorInterface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {

  private apiUrl = environment.apiUrl; // Usa la URL del entorno

  private apiUrlGetEntrenadores = `${this.apiUrl}/getEntrenadores`; // URL de tu API para obtener entrenadores
  private apiUrlGetEntrenadorByIdPersona = `${this.apiUrl}/getEntrenadorByIdPersona`; // URL de tu API para obtener entrenador por ID
  private apiUrlcrearEntrenador = `${this.apiUrl}/crearEntrenador`; // URL de tu API para crear un entrenador
  private apiUrlAsignarGimnasios = `${this.apiUrl}/asignar-gimnasio`; // URL para asignar gimnasios a un entrenador
  private apiUrlGetGimnasiosAsignados = `${this.apiUrl}/get-gimnasios-asignados`; // URL para obtener gimnasios asignados

  constructor(private http: HttpClient) { }

  // Método para obtener todos los entrenadores
  getEntrenadores(): Observable<{ entrenadores: Entrenador[] }> {
    return this.http.get<{ entrenadores: Entrenador[] }>(this.apiUrlGetEntrenadores);
  }

  // Método para obtener un entrenador por su ID
  getEntrenadorById(id_persona: number): Observable<Entrenador> {
    return this.http.post<Entrenador>(this.apiUrlGetEntrenadorByIdPersona, { id_persona });
  }

  crearEntrenador(entrenadorData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlcrearEntrenador, entrenadorData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para asignar gimnasios a un entrenador
  asignarGimnasios(id_entrenador: number, id_gimnasios: number[]): Observable<any> {
    const requestBody = { id_entrenador, id_gimnasios };
    return this.http.post<any>(this.apiUrlAsignarGimnasios, requestBody).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener los gimnasios asignados a un entrenador
  getGimnasiosAsignados(id_entrenador: number): Observable<number[]> {
    return this.http.post<number[]>(this.apiUrlGetGimnasiosAsignados, { id_entrenador }).pipe(
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

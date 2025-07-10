import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Gimnasio } from '../data/interfaces/gimnasioInterface'; // Asegúrate de tener esta interfaz
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GimnasioService {

  private apiUrl = environment.apiUrl; // Usa la URL del entorno
  private apiUrlGetGimnasios = `${this.apiUrl}/getGimnasios`; // URL para obtener todos los gimnasios
  private apiUrlGetGimnasioByIdEntrenador = `${this.apiUrl}/getGimnasioByIdEntrenador`; // URL para obtener gimnasio por ID de entrenador
  private apiUrlGetGimnasioByIdAtleta = `${this.apiUrl}/getGimnasioByIdAtleta`; // URL para obtener gimnasio por ID de entrenador

  constructor(private http: HttpClient) { }

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

  // Método para obtener todos los gimnasios
  getGimnasios(): Observable<Gimnasio[]> {
    return this.http.get<Gimnasio[]>(this.apiUrlGetGimnasios);
  }

  // Método para obtener un gimnasio por el ID del entrenador
  getGimnasioByIdEntrenador(idEntrenador: number): Observable<Gimnasio> {
    const body = { idEntrenador };  // Enviar el ID del entrenador en el cuerpo de la solicitud
    return this.http.post<Gimnasio>(this.apiUrlGetGimnasioByIdEntrenador, body);
  }

  getGimnasioByIdAtleta(id_atleta: number): Observable<Gimnasio> {
    const body = { id_atleta };  // Enviar el ID del entrenador en el cuerpo de la solicitud
    return this.http.post<Gimnasio>(this.apiUrlGetGimnasioByIdAtleta, body);
  }

  // Método para crear un gimnasio
  crearGimnasio(gimnasioData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crearGimnasio`, gimnasioData).pipe(
      catchError(this.handleError)
    );
  }
}

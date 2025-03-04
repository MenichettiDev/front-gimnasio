import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = environment.apiUrl; // Usa la URL del entorno
  private apiUrlPersona = `${this.apiUrl}/personas`; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  // 1. Listar todas las personas
  listarPersonas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlPersona}`).pipe(
      catchError(this.handleError)
    );
  }

  // 2. Obtener una persona por su ID
  obtenerPersonaPorId(idPersona: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlPersona}/${idPersona}`).pipe(
      catchError(this.handleError)
    );
  }

  // 3. Crear una nueva persona
  crearPersona(personaData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlPersona}`, personaData).pipe(
      catchError(this.handleError)
    );
  }

  // 4. Editar una persona existente (sin foto)
  editarPersona(idPersona: number, personaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrlPersona}/${idPersona}`, personaData).pipe(
      catchError(this.handleError)
    );
  }

  // 5. Editar una persona con foto
  editarPersonaConFoto(idPersona: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrlPersona}/${idPersona}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  // 6. Eliminar una persona por su ID
  eliminarPersona(idPersona: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlPersona}/${idPersona}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      console.error('Error del cliente:', error.error.message);
    } else {
      // Error del lado del servidor
      console.error(`Código de error del servidor: ${error.status}, mensaje: ${error.error.message}`);
    }
    // Devolver un observable con un mensaje de error
    return throwError('Algo salió mal. Por favor, inténtalo de nuevo más tarde.');
  }
}

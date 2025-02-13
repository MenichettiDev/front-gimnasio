import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Atleta } from '../data/interfaces/atletaInterface';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtletaService {
  private apiUrlGetAtletas = 'http://localhost:7000/getAtletas'; // URL para obtener todos los atletas
  private apiUrlGetAtletaById = 'http://localhost:7000/getAtletaById'; // URL para obtener atletas por ID de entrenador
  private apiUrlCrearAtleta = 'http://localhost:7000/crearAtleta'; // URL para crear un atleta
  private apiUrlEditarAtleta = 'http://localhost:7000/editarAtleta'; // URL para editar un atleta

  constructor(private http: HttpClient) { }

  // Método para obtener todos los atletas
  getAtletas(): Observable<{ atletas: Atleta[] }> {
    return this.http.get<{ atletas: Atleta[] }>(this.apiUrlGetAtletas).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener atletas por ID de entrenador
  getAtletasPorEntrenador(idEntrenador: number): Observable<{ atletas: Atleta[] }> {
    return this.http.post<{ atletas: Atleta[] }>(this.apiUrlGetAtletaById, { idEntrenador }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear un atleta
  crearAtleta(atletaData: Atleta): Observable<any> {
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
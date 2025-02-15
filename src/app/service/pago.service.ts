import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private apiUrlGetPagosPorAtleta = 'http://localhost:7000/getPagosPorAtleta'; // URL para obtener pagos por atleta
  private apiUrlGetPagoPorId = 'http://localhost:7000/getPagoPorId'; // URL para obtener un pago por su ID
  private apiUrlCreatePago = 'http://localhost:7000/createPago'; // URL para crear un pago
  private apiUrlUpdatePago = 'http://localhost:7000/updatePago'; // URL para actualizar un pago
  private apiUrlDeletePago = 'http://localhost:7000/deletePago'; // URL para eliminar un pago
  private apiUrlGetPagosPorFecha = 'http://localhost:7000/getPagosPorFecha'; // URL para obtener pagos por fecha
  private apiUrlGetTotalPagosPorAtleta = 'http://localhost:7000/getTotalPagosPorAtleta'; // URL para obtener el total de pagos por atleta

  constructor(private http: HttpClient) { }

  // Método para obtener pagos por atleta
  getPagosPorAtleta(idAtleta: number): Observable<any> {
    return this.http.post<any>(this.apiUrlGetPagosPorAtleta, { id_atleta: idAtleta }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener un pago por su ID
  getPagoPorId(idPago: number): Observable<any> {
    return this.http.post<any>(this.apiUrlGetPagoPorId, { id_pago: idPago }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para crear un pago
  createPago(pagoData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlCreatePago, pagoData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para actualizar un pago
  updatePago(pagoData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlUpdatePago, pagoData).pipe(
      catchError(this.handleError)
    );
  }

  // Método para eliminar un pago
  deletePago(idPago: number): Observable<any> {
    return this.http.post<any>(this.apiUrlDeletePago, { id_pago: idPago }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener pagos por fecha
  getPagosPorFecha(fecha: string): Observable<any> {
    return this.http.post<any>(this.apiUrlGetPagosPorFecha, { fecha }).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener el total de pagos por atleta
  getTotalPagosPorAtleta(idAtleta: number): Observable<any> {
    return this.http.post<any>(this.apiUrlGetTotalPagosPorAtleta, { id_atleta: idAtleta }).pipe(
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
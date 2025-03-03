import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormaPago } from '../data/interfaces/tbFormaPagoInterface'; // Ruta del archivo de la interfaz
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {
  
      private apiUrl = environment.apiUrl; 

  private apiUrll = `${this.apiUrl}/getFormasPago`; // URL base del endpoint

  constructor(private http: HttpClient) { }

  // Método para obtener todas las formas de pago
  getFormasPago(): Observable<FormaPago[]> {
    return this.http.get<FormaPago[]>(this.apiUrll);
  }

  // Método para obtener una forma de pago por su ID
  getFormaPagoById(id: number): Observable<FormaPago> {
    const url = `${this.apiUrll}/${id}`;
    return this.http.get<FormaPago>(url);
  }

  // Método para crear una nueva forma de pago
  crearFormaPago(nombre: string): Observable<FormaPago> {
    const body = { nombre };
    return this.http.post<FormaPago>(this.apiUrll, body);
  }

  // Método para actualizar una forma de pago existente
  actualizarFormaPago(id: number, nombre: string): Observable<FormaPago> {
    const url = `${this.apiUrll}/${id}`;
    const body = { nombre };
    return this.http.put<FormaPago>(url, body);
  }

  // Método para eliminar una forma de pago
  eliminarFormaPago(id: number): Observable<void> {
    const url = `${this.apiUrll}/${id}`;
    return this.http.delete<void>(url);
  }
}
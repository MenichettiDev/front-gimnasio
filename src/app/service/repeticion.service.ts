import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repeticion } from '../data/interfaces/repeticionInterface'; // Ruta del archivo de la interfaz

@Injectable({
  providedIn: 'root'
})
export class RepeticionService {

  private apiUrlGetRepeticion = 'http://localhost:7000/getRepeticion'; // URL del endpoint
  private apiUrl = 'http://localhost:7000/repeticiones'; // URL base del endpoint

  constructor(private http: HttpClient) { }

  // Método para obtener todas las repeticiones
  getRepeticion(): Observable<Repeticion[]> {
    return this.http.get<Repeticion[]>(this.apiUrlGetRepeticion);
  }

  // 1. Obtener todas las repeticiones
  // getRepeticion(): Observable<Repeticion[]> {
  //   return this.http.get<Repeticion[]>(`${this.apiUrl}`);
  // }

  // 2. Obtener una repetición por ID
  getRepeticionById(id: number): Observable<Repeticion> {
    return this.http.get<Repeticion>(`${this.apiUrl}/${id}`);
  }

  // 3. Crear una nueva repetición
  crearRepeticion(nombre: string, frecuencia: string, comentario: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { nombre, frecuencia, comentario });
  }

  // 4. Actualizar una repetición existente
  actualizarRepeticion(id: number, nombre: string, frecuencia: string, comentario: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { nombre, frecuencia, comentario });
  }

  // 5. Eliminar una repetición
  eliminarRepeticion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

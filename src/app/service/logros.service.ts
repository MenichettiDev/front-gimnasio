import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logro } from '../data/interfaces/tbLogroInterface'; // Ruta del archivo de la interfaz

@Injectable({
  providedIn: 'root',
})
export class LogrosService {
  private apiUrl = 'http://localhost:7000/logros'; // URL base del endpoint

  constructor(private http: HttpClient) {}

  // 1. Obtener todos los logros
  obtenerLogros(): Observable<Logro[]> {
    return this.http.get<Logro[]>(`${this.apiUrl}`);
  }

  // 2. Obtener un logro por ID
  obtenerLogroPorId(id: number): Observable<Logro> {
    return this.http.get<Logro>(`${this.apiUrl}/${id}`);
  }

  // 3. Crear un nuevo logro
  crearLogro(
    id_atleta: number,
    nombre_logro: string,
    descripcion_logro: string,
    fecha: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}`, {
      id_atleta,
      nombre_logro,
      descripcion_logro,
      fecha,
    });
  }

  // 4. Actualizar un logro existente
  actualizarLogro(
    id: number,
    id_atleta: number,
    nombre_logro: string,
    descripcion_logro: string,
    fecha: string
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {
      id_atleta,
      nombre_logro,
      descripcion_logro,
      fecha,
    });
  }

  // 5. Eliminar un logro
  eliminarLogro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 6. Listar logros por ID de atleta
  listarLogrosPorIdAtleta(id_atleta: number): Observable<Logro[]> {
    return this.http.get<Logro[]>(`${this.apiUrl}/atleta/${id_atleta}`);
  }
}
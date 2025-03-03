import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logro } from '../data/interfaces/tbLogroInterface'; // Ruta del archivo de la interfaz
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogrosService {
  
    private apiUrl = environment.apiUrl; // Usa la URL del entorno
  private apiUrllogros = `${this.apiUrl}/logros`; // URL base del endpoint

  constructor(private http: HttpClient) {}

  // 1. Obtener todos los logros
  obtenerLogros(): Observable<Logro[]> {
    return this.http.get<Logro[]>(`${this.apiUrllogros}`);
  }

  // 2. Obtener un logro por ID
  obtenerLogroPorId(id: number): Observable<Logro> {
    return this.http.get<Logro>(`${this.apiUrllogros}/${id}`);
  }

  // 3. Crear un nuevo logro
  crearLogro(
    id_atleta: number,
    nombre_logro: string,
    descripcion_logro: string,
    fecha: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrllogros}`, {
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
    return this.http.put(`${this.apiUrllogros}/${id}`, {
      id_atleta,
      nombre_logro,
      descripcion_logro,
      fecha,
    });
  }

  // 5. Eliminar un logro
  eliminarLogro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrllogros}/${id}`);
  }

  // 6. Listar logros por ID de atleta
  listarLogrosPorIdAtleta(id_atleta: number): Observable<Logro[]> {
    return this.http.get<Logro[]>(`${this.apiUrllogros}/atleta/${id_atleta}`);
  }
}
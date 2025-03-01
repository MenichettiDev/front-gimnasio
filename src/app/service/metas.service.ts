import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meta } from '../data/interfaces/tbMetaInterface'; // Ruta del archivo de la interfaz

@Injectable({
  providedIn: 'root',
})
export class MetasService {
  private apiUrl = 'http://localhost:7000/metas'; // URL base del endpoint

  constructor(private http: HttpClient) {}

  // 1. Obtener todas las metas
  obtenerMetas(): Observable<Meta[]> {
    return this.http.get<Meta[]>(`${this.apiUrl}`);
  }

  // 2. Obtener una meta por ID
  obtenerMetaPorId(id: number): Observable<Meta> {
    return this.http.get<Meta>(`${this.apiUrl}/${id}`);
  }

  // 3. Crear una nueva meta
  crearMeta(
    id_atleta: number,
    descripcion: string,
    tipo_meta: string,
    valor_objetivo: number,
    fecha_establecimiento: string,
    fecha_vencimiento: string,
    estado: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}`, {
      id_atleta,
      descripcion,
      tipo_meta,
      valor_objetivo,
      fecha_establecimiento,
      fecha_vencimiento,
      estado,
    });
  }

  // 4. Actualizar una meta existente
  actualizarMeta(
    id: number,
    id_atleta: number,
    descripcion: string,
    tipo_meta: string,
    valor_objetivo: number,
    fecha_establecimiento: string,
    fecha_vencimiento: string,
    estado: string
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {
      id_atleta,
      descripcion,
      tipo_meta,
      valor_objetivo,
      fecha_establecimiento,
      fecha_vencimiento,
      estado,
    });
  }

  // 5. Eliminar una meta
  eliminarMeta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 6. Listar metas por ID de atleta
  listarMetasPorIdAtleta(id_atleta: number): Observable<Meta[]> {
    return this.http.get<Meta[]>(`${this.apiUrl}/atleta/${id_atleta}`);
  }
}
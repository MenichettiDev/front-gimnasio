import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoMuscular } from '../data/interfaces/grupoMuscularInterface'; // Asegúrate de tener esta interfaz

@Injectable({
  providedIn: 'root'
})
export class GruposMuscularesService {

  private apiUrlGetGruposMusculares = 'http://localhost:7000/getGruposMusculares'; // URL de la API
  private apiUrl = 'http://localhost:7000/grupos-musculares'; // URL base de la API

  constructor(private http: HttpClient) { }

  // Método para obtener todos los grupos musculares
  getGruposMusculares(): Observable<GrupoMuscular[]> {
    return this.http.get<GrupoMuscular[]>(this.apiUrlGetGruposMusculares);
  }

  // 1. Obtener todos los grupos musculares
  // getGruposMusculares(): Observable<GrupoMuscular[]> {
  //   return this.http.get<GrupoMuscular[]>(`${this.apiUrl}`);
  // }

  // 2. Obtener un grupo muscular por ID
  getGrupoMuscularById(id: number): Observable<GrupoMuscular> {
    return this.http.get<GrupoMuscular>(`${this.apiUrl}/${id}`);
  }

  // 3. Crear un nuevo grupo muscular
  crearGrupoMuscular(nombre: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { nombre });
  }

  // 4. Actualizar un grupo muscular existente
  actualizarGrupoMuscular(id: number, nombre: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { nombre });
  }

  // 5. Eliminar un grupo muscular
  eliminarGrupoMuscular(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

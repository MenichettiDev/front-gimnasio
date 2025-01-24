import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejercicio } from '../data/interfaces/ejercicioInterface'; // Ruta correcta según tu estructura

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  private apiUrlGetEjercicios = 'http://localhost:7000/getEjercicios'; // URL de tu API para obtener todos los ejercicios
  private apiUrlGetEjercicioByGrupoMuscular = 'http://localhost:7000/getEjercicioByGrupoMuscular'; // URL de tu API para obtener ejercicio por grupo muscular
  private apiUrlGetEjercicioById = 'http://localhost:7000/getEjercicioByIdEjercicio'; // URL de tu API para obtener ejercicio por ID
  private apiUrlUpdateEjercicio = 'http://localhost:7000/updateEjercicio'; // URL de tu API para actualizar ejercicio
  private apiUrlDeleteEjercicio = 'http://localhost:7000/deleteEjercicio'; // URL de tu API para eliminar ejercicio

  constructor(private http: HttpClient) { }

  // Método para obtener todos los ejercicios
  getEjercicios(): Observable<{ ejercicios: Ejercicio[] }> {
    return this.http.get<{ ejercicios: Ejercicio[] }>(this.apiUrlGetEjercicios);
  }

  // Método para obtener ejercicios por grupo muscular
  getEjercicioPorGrupoMuscular(id_grupo_muscular: number): Observable<Ejercicio[]> {
    return this.http.post<Ejercicio[]>(this.apiUrlGetEjercicioByGrupoMuscular, { id_grupo_muscular });
  }

  // Método para obtener ejercicio por ID
  getEjercicioById(id_ejercicio: number): Observable<Ejercicio> {
    return this.http.post<Ejercicio>(this.apiUrlGetEjercicioById, { id_ejercicio });
  }

  // Método para actualizar ejercicio
  updateEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.post<Ejercicio>(this.apiUrlUpdateEjercicio, ejercicio);
  }

  // Método para eliminar ejercicio
  deleteEjercicio(id_ejercicio: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrlDeleteEjercicio, { id_ejercicio });
  }
}

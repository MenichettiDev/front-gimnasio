import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejercicio } from '../data/interfaces/ejercicioInterface'; // Ruta correcta según tu estructura
import { environment } from '../../environments/environment'; // Importa las variables de entorno

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {
  private apiUrl = environment.apiUrl; // Usa la URL del entorno
  private apiUrlGetEjercicios = `${this.apiUrl}/getEjercicios`; // URL de tu API para obtener todos los ejercicios
  private apiUrlGetEjercicioByGrupoMuscular = `${this.apiUrl}/getEjercicioByGrupoMuscular`; // URL de tu API para obtener ejercicio por grupo muscular
  private apiUrlGetEjercicioById = `${this.apiUrl}/getEjercicioByIdEjercicio`; // URL de tu API para obtener ejercicio por ID
  private apiUrlUpdateEjercicio = `${this.apiUrl}/updateEjercicio`; // URL de tu API para actualizar ejercicio
  private apiUrlDeleteEjercicio = `${this.apiUrl}/deleteEjercicio`; // URL de tu API para eliminar ejercicio
  private apiUrlCreateEjercicio = `${this.apiUrl}/crearEjercicio`; // URL de tu API para crear ejercicio

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

  // Método para crear ejercicio
  createEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.post<Ejercicio>(this.apiUrlCreateEjercicio, ejercicio);
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
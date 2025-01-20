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

  constructor(private http: HttpClient) { }

  // Método para obtener todos los ejercicios
  getEjercicios(): Observable<{ ejercicios: Ejercicio[] }> {
    return this.http.get<{ ejercicios: Ejercicio[] }>(this.apiUrlGetEjercicios);
  }

  // Método para obtener ejercicios por grupo muscular
  getEjercicioPorGrupoMuscular(id_grupo_muscular: number): Observable<Ejercicio[]> {
    return this.http.post<Ejercicio[]>(this.apiUrlGetEjercicioByGrupoMuscular,{ id_grupo_muscular });
  }
}

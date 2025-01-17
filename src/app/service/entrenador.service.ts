import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrenador } from '../data/interfaces/entrenadorInterface';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {

  private apiUrlGetEntrenadores = 'http://localhost:7000/getEntrenadores'; // URL de tu API para obtener entrenadores
  private apiUrlGetEntrenadorById = 'http://localhost:7000/getEntrenadorById'; // URL de tu API para obtener entrenador por ID

  constructor(private http: HttpClient) { }

  // Método para obtener todos los entrenadores
  getEntrenadores(): Observable<{ entrenadores: Entrenador[] }> {
    return this.http.get<{ entrenadores: Entrenador[] }>(this.apiUrlGetEntrenadores);
  }

  // Método para obtener un entrenador por su ID
  getEntrenadorById(id: number): Observable<Entrenador> {
    return this.http.post<Entrenador>(this.apiUrlGetEntrenadorById, { id });
  }
}

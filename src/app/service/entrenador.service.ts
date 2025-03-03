import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrenador } from '../data/interfaces/entrenadorInterface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
  
    private apiUrl = environment.apiUrl; // Usa la URL del entorno

  private apiUrlGetEntrenadores = `${this.apiUrl}/getEntrenadores`; // URL de tu API para obtener entrenadores
  private apiUrlGetEntrenadorByIdPersona = `${this.apiUrl}/getEntrenadorByIdPersona`; // URL de tu API para obtener entrenador por ID

  constructor(private http: HttpClient) { }

  // Método para obtener todos los entrenadores
  getEntrenadores(): Observable<{ entrenadores: Entrenador[] }> {
    return this.http.get<{ entrenadores: Entrenador[] }>(this.apiUrlGetEntrenadores);
  }

  // Método para obtener un entrenador por su ID
  getEntrenadorById(id_persona: number): Observable<Entrenador> {
    return this.http.post<Entrenador>(this.apiUrlGetEntrenadorByIdPersona, { id_persona });
  }
}

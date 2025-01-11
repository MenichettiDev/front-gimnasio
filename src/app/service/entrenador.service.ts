// entrenadores.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo de Entrenador (opcional, dependiendo de cómo tengas la respuesta)
export interface Entrenador {
  id_entrenador: number;
  dni: string;
  email: string;
  nombre: string;
  apellido: string;
  apodo: string;
  fecha_nacimiento: Date;
  celular: string;
  foto_archivo: string;

  // Otros campos según la API
}

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {

  private apiUrl = 'http://localhost:7000/obtener-Entrenadores'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener los entrenadores
  obtenerEntrenadores():  Observable<{ entrenadores: Entrenador[] }> {
    // console.log("buscando entrenadores...");
    return this.http.get<{ entrenadores: Entrenador[]}>(this.apiUrl);
  }
}

// entrenadores.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entrenador } from '../data/interfaces/entrenadorInterface';


@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {

  private apiUrl = 'http://localhost:7000/getEntrenadores'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener los entrenadores
  getEntrenadores():  Observable<{ entrenadores: Entrenador[] }> {
    // console.log("buscando entrenadores...");
    return this.http.get<{ entrenadores: Entrenador[]}>(this.apiUrl);
  }
}

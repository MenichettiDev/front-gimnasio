import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atleta } from '../data/interfaces/atletaInterface';

@Injectable({
  providedIn: 'root',
})
export class AtletaService {
  private apiUrlGetAtletas = 'http://localhost:7000/getAtletas'; // URL para obtener todos los atletas
  private apiUrlGetAtletaById = 'http://localhost:7000/getAtletaById'; // URL para obtener atletas por ID de entrenador

  constructor(private http: HttpClient) {}

  // Método para obtener todos los atletas
  getAtletas(): Observable<{ atletas: Atleta[] }> {
    return this.http.get<{ atletas: Atleta[] }>(this.apiUrlGetAtletas);
  }

  // Método para obtener atletas por ID de entrenador
  getAtletasPorEntrenador(idEntrenador: number): Observable<{ atletas: Atleta[] }> {
    return this.http.post<{ atletas: Atleta[] }>(this.apiUrlGetAtletaById, { idEntrenador });
  }
}
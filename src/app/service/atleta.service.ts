import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atleta } from '../data/interfaces/atletaInterface';

@Injectable({
  providedIn: 'root'
})
export class AtletaService {

  private apiUrlGetAtletas = 'http://localhost:7000/getAtletas'; // URL de tu API para obtener atletas
  private apiUrlGetAtletaById = 'http://localhost:7000/getAtletaById'; // URL de tu API para obtener atleta por ID

  constructor(private http: HttpClient) { }

  // Método para obtener todos los atletas
  getAtletas(): Observable<{ atletas: Atleta[] }> {
    return this.http.get<{ atletas: Atleta[] }>(this.apiUrlGetAtletas);
  }

  // Método para obtener un atleta por su ID (en este caso por ID de entrenador)
  getAtletaById(id: number): Observable<Atleta> {
    return this.http.post<Atleta>(this.apiUrlGetAtletaById, { id });
  }
}

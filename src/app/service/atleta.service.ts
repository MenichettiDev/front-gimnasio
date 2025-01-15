import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Atleta } from '../data/interfaces/atletaInterface';

@Injectable({
  providedIn: 'root'
})
export class AtletaService {
  private apiUrl = 'http://localhost:7000/obtener-Atletas'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener los entrenadores
  getAtletas():  Observable<{ atletas: Atleta[] }> {
    // console.log("buscando entrenadores...");
    return this.http.get<{ atletas: Atleta[]}>(this.apiUrl);
  }
}

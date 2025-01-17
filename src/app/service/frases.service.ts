import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Frase } from '../data/interfaces/fraseInterface';  // Ruta al archivo de la interfaz

@Injectable({
  providedIn: 'root'
})
export class FrasesService {

  // La URL del endpoint para obtener una frase aleatoria
  private apiUrl = 'http://localhost:7000/getFraseAleatoria';

  constructor(private http: HttpClient) { }

  // Método para obtener una frase aleatoria
  getFraseAleatoria(): Observable<Frase> {
    return this.http.get<Frase>(this.apiUrl);
  }
}

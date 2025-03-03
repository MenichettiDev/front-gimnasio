import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Frase } from '../data/interfaces/fraseInterface';  // Ruta al archivo de la interfaz
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrasesService {

  private apiUrl = environment.apiUrl; // Usa la URL del entorno
  // La URL del endpoint para obtener una frase aleatoria
  private apiUrl2 = `${this.apiUrl}/getFraseAleatoria`;

  constructor(private http: HttpClient) { }

  // Método para obtener una frase aleatoria
  getFraseAleatoria(): Observable<Frase> {
    return this.http.get<Frase>(this.apiUrl2);
  }
}

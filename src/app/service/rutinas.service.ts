import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rutina } from '../data/interfaces/rutinaInterface'; // Asegúrate de tener la interfaz correcta

@Injectable({
  providedIn: 'root'
})
export class RutinasService {

  private apiUrlGetRutinaByIdAtleta = 'http://localhost:7000/getRutinaByIdAtleta'; // URL de la API para obtener rutina por ID de atleta
  private apiUrlGetRutinaByIdCreador = 'http://localhost:7000/getRutinaByIdCreador'; // URL de la API para obtener rutina por ID de creador
  private apiUrlGetRutinasFree = 'http://localhost:7000/getRutinasFree'; // URL de la API para obtener rutinas gratuitas

  constructor(private http: HttpClient) { }

  // Método para obtener la rutina por ID de atleta
  getRutinaByIdAtleta(id_Atleta: number): Observable<Rutina[]> {
    return this.http.post<Rutina[]>(this.apiUrlGetRutinaByIdAtleta, { id_Atleta });
  }

  // Método para obtener las rutinas creadas por un creador por ID
  getRutinaByIdCreador(id_Creador: number): Observable<Rutina[]> {
    return this.http.post<Rutina[]>(this.apiUrlGetRutinaByIdCreador, { id_Creador });
  }

  // Método para obtener las rutinas gratuitas
  getRutinasFree(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(this.apiUrlGetRutinasFree);
  }
}

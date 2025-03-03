import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gimnasio } from '../data/interfaces/gimnasioInterface'; // Asegúrate de tener esta interfaz
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GimnasioService {

  private apiUrl = environment.apiUrl; // Usa la URL del entorno
  private apiUrlGetGimnasios = `${this.apiUrl}/getGimnasios`; // URL para obtener todos los gimnasios
  private apiUrlGetGimnasioByIdEntrenador = `${this.apiUrl}/getGimnasioByIdEntrenador`; // URL para obtener gimnasio por ID de entrenador
  private apiUrlGetGimnasioByIdAtleta = `${this.apiUrl}/getGimnasioByIdAtleta`; // URL para obtener gimnasio por ID de entrenador

  constructor(private http: HttpClient) { }

  // Método para obtener todos los gimnasios
  getGimnasios(): Observable<Gimnasio[]> {
    return this.http.get<Gimnasio[]>(this.apiUrlGetGimnasios);
  }

  // Método para obtener un gimnasio por el ID del entrenador
  getGimnasioByIdEntrenador(idEntrenador: number): Observable<Gimnasio> {
    const body = { idEntrenador };  // Enviar el ID del entrenador en el cuerpo de la solicitud
    return this.http.post<Gimnasio>(this.apiUrlGetGimnasioByIdEntrenador, body);
  }

  getGimnasioByIdAtleta(id_atleta: number): Observable<Gimnasio> {
    const body = { id_atleta };  // Enviar el ID del entrenador en el cuerpo de la solicitud
    return this.http.post<Gimnasio>(this.apiUrlGetGimnasioByIdAtleta, body);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Membresia } from '../data/interfaces/membresiaInterface'; // Ruta a la interfaz de Membresia

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {

  private apiUrlGetMembresias = 'http://localhost:7000/getMembresias'; // URL para obtener todas las membresías
  private apiUrlGetMembresiasByIdGimnasio = 'http://localhost:7000/getMembresiasByIdGimnaiso'; // URL para obtener membresías por ID de gimnasio

  constructor(private http: HttpClient) { }

  // Método para obtener todas las membresías
  getMembresias(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(this.apiUrlGetMembresias);
  }

  // Método para obtener membresías por ID de gimnasio
  getMembresiasByIdGimnasio(idGimnasio: number): Observable<Membresia[]> {
    const body = { idGimnasio };  // Enviar el ID del gimnasio como parte del cuerpo de la solicitud
    return this.http.post<Membresia[]>(this.apiUrlGetMembresiasByIdGimnasio, body);
  }
}

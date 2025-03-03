import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Membresia } from '../data/interfaces/membresiaInterface'; // Ruta a la interfaz de Membresia
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {
  
    private apiUrl = environment.apiUrl; // Usa la URL del entorno

  private apiUrlGetMembresias = `${this.apiUrl}/getMembresias`; // URL para obtener todas las membresías
  private apiUrlGetMembresiasByIdGimnasio = `${this.apiUrl}/getMembresiasByIdGimnaiso`; // URL para obtener membresías por ID de gimnasio

  constructor(private http: HttpClient) { }

  // Método para obtener todas las membresías
  getMembresias(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(this.apiUrlGetMembresias);
  }

  // Método para obtener membresías por ID de gimnasio
  getMembresiasByIdGimnasio(id_gimnasio: number): Observable<Membresia[]> {
    const body = { id_gimnasio };  // Enviar el ID del gimnasio como parte del cuerpo de la solicitud
    return this.http.post<Membresia[]>(this.apiUrlGetMembresiasByIdGimnasio, body);
  }
}

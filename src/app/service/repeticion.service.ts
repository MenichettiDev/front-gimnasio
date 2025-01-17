import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repeticion } from '../data/interfaces/repeticionInterface'; // Ruta del archivo de la interfaz

@Injectable({
  providedIn: 'root'
})
export class RepeticionService {

  private apiUrlGetRepeticion = 'http://localhost:7000/getRepeticion'; // URL del endpoint

  constructor(private http: HttpClient) { }

  // Método para obtener todas las repeticiones
  getRepeticion(): Observable<Repeticion[]> {
    return this.http.get<Repeticion[]>(this.apiUrlGetRepeticion);
  }
}

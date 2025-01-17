import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoMuscular } from '../data/interfaces/grupoMuscularInterface'; // Asegúrate de tener esta interfaz

@Injectable({
  providedIn: 'root'
})
export class GruposMuscularesService {

  private apiUrlGetGruposMusculares = 'http://localhost:7000/getGruposMusculares'; // URL de la API

  constructor(private http: HttpClient) { }

  // Método para obtener todos los grupos musculares
  getGruposMusculares(): Observable<GrupoMuscular[]> {
    return this.http.get<GrupoMuscular[]>(this.apiUrlGetGruposMusculares);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medida } from '../data/interfaces/tbMedidaInterface'; // Ruta del archivo de la interfaz

@Injectable({
  providedIn: 'root'
})
export class MedidasService {

  private apiUrl = 'http://localhost:7000/medidas'; // URL base del endpoint

  constructor(private http: HttpClient) { }

  // 1. Obtener todas las medidas
  getMedidas(): Observable<Medida[]> {
    return this.http.get<Medida[]>(`${this.apiUrl}`);
  }

  // 2. Obtener una medida por ID
  getMedidaById(id: number): Observable<Medida> {
    return this.http.get<Medida>(`${this.apiUrl}/${id}`);
  }

  // 3. Obtener medidas por ID de atleta
  getMedidasByAtleta(id_atleta: number): Observable<Medida[]> {
    return this.http.get<Medida[]>(`${this.apiUrl}/atleta/${id_atleta}`);
  }

  // 4. Crear una nueva medida
  crearMedida(
    id_atleta: number,
    fecha_medicion: string,
    peso: number,
    altura: number,
    biceps: number,
    pecho: number,
    hombros: number,
    cintura: number,
    gluteos: number,
    cuadriceps: number,
    gemelos: number,
    antebrazo: number,
    cuello: number,
    grasa_corporal: number
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}`, {
      id_atleta,
      fecha_medicion,
      peso,
      altura,
      biceps,
      pecho,
      hombros,
      cintura,
      gluteos,
      cuadriceps,
      gemelos,
      antebrazo,
      cuello,
      grasa_corporal
    });
  }

  // 5. Actualizar una medida existente
  actualizarMedida(
    id: number,
    id_atleta: number,
    fecha_medicion: string,
    peso: number,
    altura: number,
    biceps: number,
    pecho: number,
    hombros: number,
    cintura: number,
    gluteos: number,
    cuadriceps: number,
    gemelos: number,
    antebrazo: number,
    cuello: number,
    grasa_corporal: number
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, {
      id_atleta,
      fecha_medicion,
      peso,
      altura,
      biceps,
      pecho,
      hombros,
      cintura,
      gluteos,
      cuadriceps,
      gemelos,
      antebrazo,
      cuello,
      grasa_corporal
    });
  }

  // 6. Eliminar una medida
  eliminarMedida(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
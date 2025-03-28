import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medida } from '../data/interfaces/tbMedidaInterface'; // Ruta del archivo de la interfaz
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedidasService {

  private apiUrl = environment.apiUrl; // Usa la URL del entorno
  private apiUrlMedidas = `${this.apiUrl}/medidas`; // URL base del endpoint

  constructor(private http: HttpClient) { }

  // 1. Obtener todas las medidas
  getMedidas(): Observable<Medida[]> {
    return this.http.get<Medida[]>(`${this.apiUrlMedidas}`);
  }

  // 2. Obtener una medida por ID
  getMedidaById(id: number): Observable<Medida> {
    return this.http.get<Medida>(`${this.apiUrlMedidas}/${id}`);
  }

  // 3. Obtener medidas por ID de atleta
  getMedidasByAtleta(id_atleta: number): Observable<Medida[]> {
    return this.http.get<Medida[]>(`${this.apiUrlMedidas}/atleta/${id_atleta}`);
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
    return this.http.post(`${this.apiUrlMedidas}`, {
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
    return this.http.put(`${this.apiUrlMedidas}/${id}`, {
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
    return this.http.delete(`${this.apiUrlMedidas}/${id}`);
  }
}
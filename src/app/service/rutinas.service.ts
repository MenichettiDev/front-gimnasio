import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rutina } from '../data/interfaces/rutinaInterface'; // Asegúrate de tener la interfaz correcta
import { plan } from '../data/interfaces/rutinaArmadaInterface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {


  private apiUrl = environment.apiUrl; // Usa la URL del entorno

  private apiUrlFiltar = `${this.apiUrl}/getRutinasFiltradas`;
  private apiUrlGetRutinaByIdAtleta = `${this.apiUrl}/getRutinaByIdAtleta`; // URL de la API para obtener rutina por ID de atleta
  private apiUrlGetRutinaByIdCreador = `${this.apiUrl}/getRutinaByIdCreador`; // URL de la API para obtener rutina por ID de creador
  private apiUrlGetRutinaByIdRutina = `${this.apiUrl}/getRutinaByIdRutina`; // URL de la API para obtener rutina por ID de creador
  private apiUrlGetRutinasFree = `${this.apiUrl}/getRutinasFree`; // URL de la API para obtener rutinas gratuitas
  private apiUrlCreateRutina = `${this.apiUrl}/crearRutinaYAsignarAtleta`;
  private apiUrlEditarRutina = `${this.apiUrl}/editarRutina`;
  private apiUrlEliminarRutina = `${this.apiUrl}/eliminarRutina`;

  constructor(private http: HttpClient) { }

  //rutina filtrada
  filtrada(filtro: any): Observable<any> {
    return this.http.post(this.apiUrlFiltar, filtro);
  }

  // Método para obtener la rutina por ID de atleta
  getRutinaByIdAtleta(id_atleta: number, id_entrenador?: number, id_gimnasio?: number): Observable<plan[]> {
    return this.http.post<plan[]>(this.apiUrlGetRutinaByIdAtleta, { id_atleta, id_entrenador, id_gimnasio });
  }

  // Método para obtener las rutinas creadas por un creador por ID
  getRutinaByIdCreador(id_persona: number): Observable<plan[]> {
    return this.http.post<plan[]>(this.apiUrlGetRutinaByIdCreador, { id_persona });
  }

  // Método para obtener las rutinas by id
  getRutinaByIdRutina(id_rutina: number): Observable<plan> {
    return this.http.post<plan>(this.apiUrlGetRutinaByIdRutina, { id_rutina });
  }

  // Método para obtener las rutinas gratuitas
  getRutinasFree(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(this.apiUrlGetRutinasFree);
  }

  // Método para crear rutina
  createRutina(rutina: any): Observable<any> {
    return this.http.post<any>(this.apiUrlCreateRutina, rutina);
  }
  // Método para editar rutina
  editarRutina(rutina: any): Observable<any> {
    return this.http.post<any>(this.apiUrlEditarRutina, rutina);
  }
  // Método para eliminar rutina
  eliminarRutina(id_rutina: number): Observable<number> {
    return this.http.post<number>(this.apiUrlEliminarRutina, { id_rutina });
  }
}

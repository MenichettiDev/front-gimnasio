import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rutina } from '../data/interfaces/rutinaInterface'; // Asegúrate de tener la interfaz correcta
import { plan } from '../data/interfaces/rutinaArmadaInterface';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {

  private apiUrlGetRutinaByIdAtleta = 'http://localhost:7000/getRutinaByIdAtleta'; // URL de la API para obtener rutina por ID de atleta
  private apiUrlGetRutinaByIdCreador = 'http://localhost:7000/getRutinaByIdCreador'; // URL de la API para obtener rutina por ID de creador
  private apiUrlGetRutinaByIdRutina = 'http://localhost:7000/getRutinaByIdRutina'; // URL de la API para obtener rutina por ID de creador
  private apiUrlGetRutinasFree = 'http://localhost:7000/getRutinasFree'; // URL de la API para obtener rutinas gratuitas
  private apiUrlCreateRutina = 'http://localhost:7000/crearRutinaYAsignarAtleta'; 
  private apiUrlEditarRutina = 'http://localhost:7000/editarRutina'; 
  private apiUrlEliminarRutina = 'http://localhost:7000/eliminarRutina'; 

  constructor(private http: HttpClient) { }

  // Método para obtener la rutina por ID de atleta
  getRutinaByIdAtleta(id_Atleta: number): Observable<plan[]> {
    return this.http.post<plan[]>(this.apiUrlGetRutinaByIdAtleta, { id_Atleta });
  }

  // Método para obtener las rutinas creadas por un creador por ID
  getRutinaByIdCreador(id_Creador: number): Observable<plan[]> {
    return this.http.post<plan[]>(this.apiUrlGetRutinaByIdCreador, { id_Creador });
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

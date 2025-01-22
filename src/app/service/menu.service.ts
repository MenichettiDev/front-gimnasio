import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../data/interfaces/menuInterface'; // Ruta a la interfaz 'Menu'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrlGetMenus = 'http://localhost:7000/getMenus'; // URL para obtener todos los menús
  private apiUrlGetMenusByIdAcceso = 'http://localhost:7000/menusByIdAcceso'; // URL para obtener menús por ID de persona

  constructor(private http: HttpClient) {}

  // Método para obtener todos los menús
  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrlGetMenus);
  }

  // Método para obtener los menús por ID de persona
  getMenusByIdAcceso(id_acceso: number): Observable<Menu[]> {
    return this.http.post<Menu[]>(this.apiUrlGetMenusByIdAcceso, { id_acceso });
  }
}

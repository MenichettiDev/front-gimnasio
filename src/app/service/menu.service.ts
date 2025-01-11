import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'http://localhost:7000/menus'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener los menús según el perfil del usuario
  cargarMenus( userId: string ): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`); // Ajusta la URL a tu API
  }
}

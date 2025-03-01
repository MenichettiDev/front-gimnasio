import { Injectable } from '@angular/core';
import { AtletaService } from './atleta.service';
import { EntrenadorService } from './entrenador.service';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QueEsService {
  private idPersona: number | null = null; // Almacena el ID de la persona
  private idAtleta: number | null = null; // Almacena el ID del atleta (si existe)
  private idEntrenador: number | null = null; // Almacena el ID del entrenador (si existe)

  constructor(
    private authService: AuthService,
    private atletaService: AtletaService,
    private entrenadorService: EntrenadorService
  ) {}

  /**
   * Obtiene el ID de la persona logueada y verifica si es atleta o entrenador.
   */
  verificarPersonaLogueada(): void {
    const userData = this.authService.getUser(); // Obtiene los datos del usuario logueado
    if (userData && userData.id_persona) {
      this.idPersona = userData.id_persona; // Establece el ID de la persona
      this.verificarRoles(); // Verifica roles
    } else {
      console.error('No se encontró un ID de persona en los datos del usuario logueado.');
    }
  }

  /**
   * Verifica si la persona es un atleta.
   * @returns Observable<number | null> - El ID del atleta si existe, o null si no es un atleta.
   */
  isAtleta(): Observable<number | null> {
    if (!this.idPersona) {
      return of(null); // Retorna null si no hay ID de persona
    }
    return this.atletaService.getAtletasPorIdPersona(this.idPersona).pipe(
      map((atleta) => {
        this.idAtleta = atleta?.id_atleta || null; // Guarda el ID del atleta
        return this.idAtleta;
      }),
      catchError(() => of(null)) // Maneja errores retornando null
    );
  }

  /**
   * Verifica si la persona es un entrenador.
   * @returns Observable<number | null> - El ID del entrenador si existe, o null si no es un entrenador.
   */
  isEntrenador(): Observable<number | null> {
    if (!this.idPersona) {
      return of(null); // Retorna null si no hay ID de persona
    }
    return this.entrenadorService.getEntrenadorById(this.idPersona).pipe(
      map((entrenador) => {
        this.idEntrenador = entrenador?.id_entrenador || null; // Guarda el ID del entrenador
        return this.idEntrenador;
      }),
      catchError(() => of(null)) // Maneja errores retornando null
    );
  }

  /**
   * Devuelve el ID de la persona.
   * @returns number | null - El ID de la persona.
   */
  getIdPersona(): number | null {
    return this.idPersona = this.authService.getUser()[0].id_persona;
  }

  /**
   * Verifica simultáneamente si la persona es atleta y/o entrenador.
   * @returns Observable<{ idAtleta: number | null, idEntrenador: number | null }>
   */
  verificarRoles(): Observable<{ idAtleta: number | null; idEntrenador: number | null }> {
    if (!this.idPersona) {
      return of({ idAtleta: null, idEntrenador: null });
    }

    return forkJoin({
      idAtleta: this.isAtleta(),
      idEntrenador: this.isEntrenador(),
    }).pipe(
      map(({ idAtleta, idEntrenador }) => {
        this.idAtleta = idAtleta;
        this.idEntrenador = idEntrenador;
        return { idAtleta, idEntrenador };
      })
    );
  }
}
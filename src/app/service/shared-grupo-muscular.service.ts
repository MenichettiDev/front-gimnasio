import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GrupoMuscular } from '../data/interfaces/grupoMuscularInterface';

@Injectable({
  providedIn: 'root'
})

export class SharedGrupoMuscularService {

  private selectedGrupoSubject = new BehaviorSubject<GrupoMuscular | null>(null);
  selectedGrupo$ = this.selectedGrupoSubject.asObservable();

  setSelectedGrupo(grupo: GrupoMuscular): void {
    this.selectedGrupoSubject.next(grupo);
  }

}

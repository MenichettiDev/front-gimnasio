import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Gimnasio } from '../data/interfaces/gimnasioInterface';

@Injectable({
  providedIn: 'root'
})
export class SharedGimnasioService {

  private selectedGimnasioSubject = new BehaviorSubject<number | null>(null);
  selectedGimnasio$ = this.selectedGimnasioSubject.asObservable();

  setSelectedGimnasio(gimnasio: number): void {
    this.selectedGimnasioSubject.next(gimnasio);
  }

}

import { Component } from '@angular/core';
import { FrasesService } from '../../../service/frases.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Frase } from '../../../data/interfaces/fraseInterface';

@Component({
  selector: 'app-resumen',
  imports: [CommonModule, FormsModule],
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent {

  fraseAleatoria: Frase | null = null;

  constructor( private frasesService: FrasesService) { }

  ngOnInit(): void {
    this.obtenerFraseAleatoria();
  }


  obtenerFraseAleatoria() {
    this.frasesService.getFraseAleatoria().subscribe(
      ( data ) => {
        console.log( 'frase aleatoria' + data );
        this.fraseAleatoria = data;
      }, ( error ) => {
        console.error( error );
      }
    );
  }

  // Llamada al servicio para obtener los entrenadores

}

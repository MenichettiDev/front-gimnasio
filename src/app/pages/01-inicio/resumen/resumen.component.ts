import { Component, OnInit } from '@angular/core';
import { FrasesService } from '../../../service/frases.service';
import { Frase } from '../../../data/interfaces/fraseInterface';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  fraseAleatoria: Frase | null = null;

  constructor(private frasesService: FrasesService) { }

  ngOnInit(): void {
    this.obtenerFraseAleatoria();

  }

  obtenerFraseAleatoria() {
    this.frasesService.getFraseAleatoria().subscribe(
      (data: Frase) => {
        this.fraseAleatoria = data;
      },
      (error) => {
        console.error('Error al obtener la frase:', error);
      }
    );
  }
}

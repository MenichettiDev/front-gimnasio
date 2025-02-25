import { Component } from '@angular/core';
import { FrasesService } from '../../../service/frases.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Frase } from '../../../data/interfaces/fraseInterface';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  fraseAleatoria: Frase | null = null;

  constructor(private frasesService: FrasesService) { }

  ngOnInit(): void {
    this.obtenerFraseAleatoria();
  }


  obtenerFraseAleatoria() {
    this.frasesService.getFraseAleatoria().subscribe(
      (data) => {
        console.log('frase aleatoria' + data);
        this.fraseAleatoria = data;
      }, (error) => {
        console.error(error);
      }
    );
  }

}

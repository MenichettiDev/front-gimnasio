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



}

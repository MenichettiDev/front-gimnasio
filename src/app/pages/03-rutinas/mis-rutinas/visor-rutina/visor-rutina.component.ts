import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { rutinaArmada } from '../../../../data/interfaces/rutinaArmadaInterface';

@Component({
  selector: 'app-visor-rutina',
  imports: [],
  templateUrl: './visor-rutina.component.html',
  styleUrl: './visor-rutina.component.css'
})
export class VisorRutinaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: rutinaArmada) {}
}

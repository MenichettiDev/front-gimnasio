import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { plan } from '../../../../data/interfaces/rutinaArmadaInterface';

@Component({
  selector: 'app-pdf-rutina',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-rutina.component.html',
  styleUrls: ['./pdf-rutina.component.css']
})
export class PdfRutinaComponent {
  @Input() rutinaCruda!: plan;
}

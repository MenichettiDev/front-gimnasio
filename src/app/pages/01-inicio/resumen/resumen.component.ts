import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { FrasesService } from '../../../service/frases.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-resumen',
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent {

  fraseAleatoria: string = "";

  constructor(private authService: AuthService, private frasesService: FrasesService) { }

  // Se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.fraseAleatoria = this.frasesService.getFraseAleatoria();
  }


  obtenerFraseAleatoria() {
    this.fraseAleatoria = this.frasesService.getFraseAleatoria();
  }

  // Llamada al servicio para obtener los entrenadores
  
}

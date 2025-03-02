import { Component, Input, OnInit } from '@angular/core';
import { LogrosService } from '../../../service/logros.service';
import { Logro } from '../../../data/interfaces/tbLogroInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-logros',
  imports: [ CommonModule, FormsModule],
  templateUrl: './logros.component.html',
  styleUrl: './logros.component.css'
})
export class LogrosComponent implements OnInit {
  logros: Logro[] = [];
  nuevoLogro = { nombre_logro: '', descripcion_logro: '', fecha: '' };
  idAtleta: number | null = null;

  constructor(private logrosService: LogrosService, private authService : AuthService) {}

  ngOnInit(): void {
    this.idAtleta = this.authService.getIdAtleta();
    this.cargarLogros();
  }

  // Cargar logros del atleta
  cargarLogros(): void {
    if(this.idAtleta === null) return;
    this.logrosService.listarLogrosPorIdAtleta(this.idAtleta).subscribe(
      (data) => (this.logros = data),
      (error) => console.error('Error al cargar logros:', error)
    );
  }

  // Crear un nuevo logro
  crearLogro(): void {
    if(this.idAtleta === null) return;
    this.logrosService
      .crearLogro(this.idAtleta, this.nuevoLogro.nombre_logro, this.nuevoLogro.descripcion_logro, this.nuevoLogro.fecha)
      .subscribe(() => {
        this.cargarLogros(); // Recargar la lista de logros
        this.resetForm(); // Limpiar el formulario
      });
  }

  // Eliminar un logro
  eliminarLogro(id: number): void {
    this.logrosService.eliminarLogro(id).subscribe(() => {
      this.cargarLogros(); // Recargar la lista de logros
    });
  }

  // Resetear el formulario
  resetForm(): void {
    this.nuevoLogro = { nombre_logro: '', descripcion_logro: '', fecha: '' };
  }
}

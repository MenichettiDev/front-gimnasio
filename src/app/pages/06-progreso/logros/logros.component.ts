import { Component, Input, OnInit } from '@angular/core';
import { LogrosService } from '../../../service/logros.service';
import { Logro } from '../../../data/interfaces/tbLogroInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QueEsService } from '../../../service/que-es.service';

@Component({
  selector: 'app-logros',
  imports: [ CommonModule, FormsModule],
  templateUrl: './logros.component.html',
  styleUrl: './logros.component.css'
})
export class LogrosComponent implements OnInit {
  @Input() idAtleta!: number; // ID del atleta recibido como entrada
  logros: Logro[] = [];
  nuevoLogro = { nombre_logro: '', descripcion_logro: '', fecha: '' };

  constructor(private logrosService: LogrosService, private is : QueEsService) {}

  ngOnInit(): void {
    this.cargarLogros();
  }

  // Cargar logros del atleta
  cargarLogros(): void {
    this.logrosService.listarLogrosPorIdAtleta(this.idAtleta).subscribe(
      (data) => (this.logros = data),
      (error) => console.error('Error al cargar logros:', error)
    );
  }

  // Crear un nuevo logro
  crearLogro(): void {
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

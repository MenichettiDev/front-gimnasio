import { Component, Input, OnInit } from '@angular/core';
import { MetasService } from '../../../service/metas.service';
import { Meta } from '../../../data/interfaces/tbMetaInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css'],
  imports: [CommonModule, FormsModule],
})
export class MetasComponent implements OnInit {
  idAtleta: number | null = null;
  metas: Meta[] = [];
  nuevaMeta = {
    descripcion: '',
    tipo_meta: '',
    valor_objetivo: null,
    fecha_establecimiento: '',
    fecha_vencimiento: '',
    estado: 'pendiente',
  };

  constructor(private metasService: MetasService, private authService: AuthService) { }

  ngOnInit(): void {
    this.idAtleta = this.authService.getIdAtleta();
    this.cargarMetas();
  }

  // Cargar metas del atleta
  cargarMetas(): void {
    if (this.idAtleta == null) return;
    this.metasService.listarMetasPorIdAtleta(this.idAtleta).subscribe(
      (data) => (this.metas = data),
      (error) => console.error('Error al cargar metas:', error)
    );
  }

  // Crear una nueva meta
  crearMeta(): void {
    if (this.idAtleta == null) return;

    // Asignar la fecha actual a la fecha de establecimiento
    const fechaActual =  this.getFormattedDate();
    console.log( 'fecha..'  ,fechaActual);

    this.metasService
      .crearMeta(
        this.idAtleta,
        this.nuevaMeta.descripcion,
        this.nuevaMeta.tipo_meta,
        this.nuevaMeta.valor_objetivo!,
        this.nuevaMeta.fecha_establecimiento = fechaActual,
        this.nuevaMeta.fecha_vencimiento,
        this.nuevaMeta.estado
      )
      .subscribe(() => {
        this.cargarMetas(); // Recargar la lista de metas
        this.resetForm(); // Limpiar el formulario
      });
  }

  // Actualizar el estado de una meta
  actualizarEstadoMeta(meta: Meta): void {
    if (this.idAtleta == null) return;
    meta.estado = meta.estado === 'completada' ? 'pendiente' : 'completada';

    

    this.metasService
      .actualizarMeta(
        meta.id_meta,
        this.idAtleta,
        meta.descripcion,
        meta.tipo_meta,
        meta.valor_objetivo,
        meta.fecha_establecimiento,
        meta.fecha_vencimiento,
        meta.estado
      )
      .subscribe(() => {
        this.cargarMetas(); // Recargar la lista de metas
      });
  }

  // Eliminar una meta
  eliminarMeta(id: number): void {
    this.metasService.eliminarMeta(id).subscribe(() => {
      this.cargarMetas(); // Recargar la lista de metas
    });
  }

  // Resetear el formulario
  resetForm(): void {
    this.nuevaMeta = {
      descripcion: '',
      tipo_meta: '',
      valor_objetivo: null,
      fecha_establecimiento: '',
      fecha_vencimiento: '',
      estado: 'pendiente',
    };
  }

  getFormattedDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses son base 0, por eso +1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
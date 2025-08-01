import { Component, Input, OnInit } from '@angular/core';
import { MetasService } from '../../../service/metas.service';
import { Meta } from '../../../data/interfaces/tbMetaInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth/auth.service';
import { ModalToastComponent } from '../../../components/modal/modal-toast/modal-toast.component';
import { LogrosService } from '../../../service/logros.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css'],
  imports: [CommonModule, FormsModule, ModalToastComponent],
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

  toastMessage: string = '';
  toastVisible: boolean = false;
  toastType: string = 'success';

  constructor(
    private metasService: MetasService,
    private authService: AuthService,
    private logrosService: LogrosService
  ) { }

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
    const fechaActual = this.getFormattedDate();
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
      .subscribe({
        next: () => {
          this.cargarMetas();
          this.resetForm();
          this.mostrarToast('Meta creada exitosamente', 'success');
        },
        error: () => {
          this.mostrarToast('Error al crear meta', 'error');
        }
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
      .subscribe({
        next: () => {
          this.cargarMetas();
          this.mostrarToast('Estado de meta actualizado', 'success');
        },
        error: () => {
          this.mostrarToast('Error al actualizar meta', 'error');
        }
      });
  }

  // Eliminar una meta
  eliminarMeta(id: number): void {
    this.metasService.eliminarMeta(id).subscribe({
      next: () => {
        this.cargarMetas();
        this.mostrarToast('Meta eliminada', 'success');
      },
      error: () => {
        this.mostrarToast('Error al eliminar meta', 'error');
      }
    });
  }

  // Convertir meta en logro
  convertirMetaEnLogro(meta: Meta): void {
    if (this.idAtleta == null) return;
    this.logrosService.crearLogro(
      this.idAtleta,
      meta.descripcion,
      `Meta lograda: ${meta.tipo_meta} - Objetivo: ${meta.valor_objetivo}`,
      this.getFormattedDate()
    ).subscribe({
      next: () => {
        this.metasService.eliminarMeta(meta.id_meta).subscribe({
          next: () => {
            this.cargarMetas(); // Recargar metas después de eliminar
            this.mostrarToast('¡Meta convertida en logro!', 'success');
          },
          error: () => {
            this.cargarMetas(); // Recargar aunque haya error al eliminar
            this.mostrarToast('Error al eliminar meta', 'error');
          }
        });
      },
      error: () => {
        this.mostrarToast('Error al crear logro', 'error');
      }
    });
  }

  mostrarToast(mensaje: string, tipo: string = 'success') {
    this.toastMessage = mensaje;
    this.toastType = tipo;
    this.toastVisible = true;
    setTimeout(() => {
      this.toastVisible = false;
    }, 2500);
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
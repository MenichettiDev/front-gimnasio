import { Component, Input, OnInit } from '@angular/core';
import { LogrosService } from '../../../service/logros.service';
import { Logro } from '../../../data/interfaces/tbLogroInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth/auth.service';
import { ModalToastComponent } from '../../../components/modal/modal-toast/modal-toast.component';

@Component({
  selector: 'app-logros',
  imports: [CommonModule, FormsModule, ModalToastComponent],
  templateUrl: './logros.component.html',
  styleUrl: './logros.component.css'
})
export class LogrosComponent implements OnInit {
  logros: Logro[] = [];
  nuevoLogro = { nombre_logro: '', descripcion_logro: '', fecha: '' };
  idAtleta: number | null = null;
  toastMessage: string = '';
  toastVisible: boolean = false;
  toastType: string = 'success';

  constructor(private logrosService: LogrosService, private authService: AuthService) { }

  ngOnInit(): void {
    this.idAtleta = this.authService.getIdAtleta();
    this.cargarLogros();
  }

  // Cargar logros del atleta
  cargarLogros(): void {
    if (this.idAtleta === null) return;
    this.logrosService.listarLogrosPorIdAtleta(this.idAtleta).subscribe(
      (data) => (this.logros = data),
      (error) => console.error('Error al cargar logros:', error)
    );
  }

  // Crear un nuevo logro
  crearLogro(): void {
    if (this.idAtleta === null) return;
    this.logrosService
      .crearLogro(this.idAtleta, this.nuevoLogro.nombre_logro, this.nuevoLogro.descripcion_logro, this.nuevoLogro.fecha)
      .subscribe({
        next: () => {
          this.cargarLogros();
          this.resetForm();
          this.mostrarToast('Logro creado exitosamente', 'success');
        },
        error: () => {
          this.mostrarToast('Error al crear logro', 'error');
        }
      });
  }

  // Eliminar un logro
  eliminarLogro(id: number): void {
    this.logrosService.eliminarLogro(id).subscribe({
      next: () => {
        this.cargarLogros();
        this.mostrarToast('Logro eliminado', 'success');
      },
      error: () => {
        this.mostrarToast('Error al eliminar logro', 'error');
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
    this.nuevoLogro = { nombre_logro: '', descripcion_logro: '', fecha: '' };
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { PersonaService } from '../../../service/persona.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuarioActual: any = {};
  perfil: any = {};
  isLoading: boolean = true;
  errorMessage: string = '';
  nuevaFoto: File | null = null;
  perfilesUsuario: string[] = [];

  constructor(
    private authService: AuthService,
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarioActual();
    this.detectarPerfilesUsuario();
  }

  detectarPerfilesUsuario(): void {
    this.perfilesUsuario = [];
    if (this.authService.isEntrenador()) this.perfilesUsuario.push('Entrenador');
    if (this.authService.isAtleta()) this.perfilesUsuario.push('Atleta');
    if (this.authService.isGimnasio()) this.perfilesUsuario.push('Gimnasio');
    if (this.perfilesUsuario.length === 0) this.perfilesUsuario.push('Usuario');
  }

  formatearFecha(fecha: string | Date): string {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  cargarUsuarioActual(): void {
    const idUsuario = this.authService.getUserId();
    if (!idUsuario) {
      this.errorMessage = 'No se pudo obtener el usuario actual.';
      this.isLoading = false;
      return;
    }

    this.personaService.obtenerPersonaPorId(idUsuario).subscribe(
      (data) => {
        this.perfil = data;
        if (this.perfil.fecha_nacimiento) {
          this.perfil.fecha_nacimiento = this.formatearFecha(this.perfil.fecha_nacimiento);
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar el perfil:', error);
        this.errorMessage = 'Ocurrió un error al cargar el perfil.';
        this.isLoading = false;
      }
    );
  }

  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.nuevaFoto = file;
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.perfil.foto_archivo = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  guardarCambios(): void {
    const idUsuario = this.authService.getUserId();
    if (!idUsuario) {
      this.errorMessage = 'No se pudo obtener el usuario actual.';
      return;
    }

    // Si necesitas enviar la foto, descomenta y ajusta el siguiente bloque:
    // const formData = new FormData();
    // formData.append('nombre', this.perfil.nombre);
    // formData.append('apellido', this.perfil.apellido);
    // formData.append('email', this.perfil.email);
    // formData.append('celular', this.perfil.celular || '');
    // formData.append('direccion', this.perfil.direccion || '');
    // formData.append('fecha_nacimiento', this.perfil.fecha_nacimiento);
    // if (this.nuevaFoto) {
    //   formData.append('foto_archivo', this.nuevaFoto);
    // }

    this.personaService.editarPersona(idUsuario, this.perfil).subscribe(
      (response) => {
        console.log('Perfil actualizado:', response);
        alert('Los cambios han sido guardados exitosamente.');
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
        this.errorMessage = 'Ocurrió un error al guardar los cambios.';
      }
    );
  }
}
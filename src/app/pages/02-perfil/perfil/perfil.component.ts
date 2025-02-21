import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { PersonaService } from '../../../service/persona.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  imports: [ CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuarioActual: any = {}; // Datos del usuario actual
  perfil: any = {}; // Datos del perfil cargado
  isLoading: boolean = true; // Indicador de carga
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private authService: AuthService,
    private personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarioActual();
  }

  cargarUsuarioActual(): void {
    // Obtener el ID del usuario actual desde el servicio de autenticación
    const idUsuario = this.authService.getUser()[0].id_persona;
    console.log( idUsuario ) // Supongamos que este método existe
    if (!idUsuario) {
      this.errorMessage = 'No se pudo obtener el usuario actual.';
      this.isLoading = false;
      return;
    }

    // Cargar los datos del perfil del usuario
    this.personaService.obtenerPersonaPorId(idUsuario).subscribe(
      (data) => {
        this.perfil = data; // Asignar los datos del perfil
        console.log( this.perfil );
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar el perfil:', error);
        this.errorMessage = 'Ocurrió un error al cargar el perfil.';
        this.isLoading = false;
      }
    );
  }

  guardarCambios(): void {
    // Actualizar los datos del perfil
    const idUsuario = this.authService.getUser();
    if (!idUsuario) {
      this.errorMessage = 'No se pudo obtener el usuario actual.';
      return;
    }

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

  // Método para formatear la fecha
formatearFecha(fecha: string | Date): string {
  const date = new Date(fecha);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Asegura dos dígitos para el mes
  const day = ('0' + date.getDate()).slice(-2); // Asegura dos dígitos para el día
  return `${year}-${month}-${day}`;
}
}
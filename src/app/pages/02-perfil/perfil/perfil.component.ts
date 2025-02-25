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

  // Método para formatear la fecha
  formatearFecha(fecha: string | Date): string {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Asegura dos dígitos para el mes
    const day = ('0' + date.getDate()).slice(-2); // Asegura dos dígitos para el día
    return `${year}-${month}-${day}`;
  }

  cargarUsuarioActual(): void {
    // Obtener el ID del usuario actual desde el servicio de autenticación
    const idUsuario = this.authService.getUser()[0]?.id_persona;
    console.log(idUsuario); // Supongamos que este método existe
    if (!idUsuario) {
      this.errorMessage = 'No se pudo obtener el usuario actual.';
      this.isLoading = false;
      return;
    }

    // Cargar los datos del perfil del usuario
    this.personaService.obtenerPersonaPorId(idUsuario).subscribe(
      (data) => {
        this.perfil = data; // Asignar los datos del perfil

        // Formatear la fecha de nacimiento para el input type="date"
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

  guardarCambios(): void {
    // Obtener el ID del usuario actual
    const idUsuario = this.authService.getUser()[0]?.id_persona;
    if (!idUsuario) {
      this.errorMessage = 'No se pudo obtener el usuario actual.';
      return;
    }
  
    // No es necesario convertir la fecha a un objeto Date
    // La fecha ya está en formato AAAA-MM-DD gracias al campo type="date"
  
    // Actualizar los datos del perfil
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
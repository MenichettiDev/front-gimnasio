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
  usuarioActual: any = {}; // Datos del usuario actual
  perfil: any = {}; // Datos del perfil cargado
  isLoading: boolean = true; // Indicador de carga
  errorMessage: string = ''; // Mensaje de error
  nuevaFoto: File | null = null; // Almacena la nueva foto seleccionada

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
    const idUsuario = this.authService.getIdPersona();
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

  // Maneja la selección de archivos
  // onFileSelected(event: any): void {
  //   const file = event.target.files[0]; // Obtiene el archivo seleccionado
  //   if (file) {
  //     this.nuevaFoto = file; // Guarda el archivo para enviarlo al servidor
  //     const reader = new FileReader(); // Crea un lector de archivos
  //     reader.onload = (e: any) => {
  //       this.perfil.foto_archivo = e.target.result; // Actualiza la vista previa
  //     };
  //     reader.readAsDataURL(file); // Lee el archivo como una URL base64
  //   }
  // }

  guardarCambios(): void {
    // Obtener el ID del usuario actual
    const idUsuario = this.authService.getIdPersona();
    if (!idUsuario) {
      this.errorMessage = 'No se pudo obtener el usuario actual.';
      return;
    }

    // Crear un objeto FormData para enviar la foto junto con los datos del perfil
    // const formData = new FormData();
    // formData.append('nombre', this.perfil.nombre);
    // formData.append('apellido', this.perfil.apellido);
    // formData.append('email', this.perfil.email);
    // formData.append('celular', this.perfil.celular || '');
    // formData.append('direccion', this.perfil.direccion || '');
    // formData.append('fecha_nacimiento', this.perfil.fecha_nacimiento);

    // Agregar la foto si se seleccionó una nueva
    // if (this.nuevaFoto) {
    //   formData.append('foto_archivo', this.nuevaFoto);
    // }

    // console.log(  'datos form', formData)
    console.log(  'datos form', this.perfil)

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

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cargar-nuevo',
  imports: [CommonModule, FormsModule],
  templateUrl: './cargar-nuevo.component.html',
  styleUrl: './cargar-nuevo.component.css'
})
export class CargarNuevoComponent {

  exercise = {
    muscleGroup: '',
    name: '',
    description: '',
    image: null
  };

  imagePreview: string | null = null;
  imageFile: File | null = null;

  // Método que se llama cuando el usuario selecciona una imagen
  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    this.imageFile = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result; // Vista previa de la imagen
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.imageFile) {
      // Aquí puedes implementar la lógica para guardar el ejercicio y la imagen
      console.log('Ejercicio:', this.exercise);
      this.uploadImage(this.imageFile);
    } else {
      console.log('Falta la imagen.');
    }
  }

  // Simulación de carga de imagen (para implementarlo en el backend)
  uploadImage(file: File): void {
    const formData = new FormData();
    formData.append('file', file, file.name);

    // Aquí deberías llamar a tu API para guardar la imagen y el ejercicio
    // Ejemplo: this.exerciseService.uploadImage(formData).subscribe(response => { ... });

    console.log('Imagen cargada correctamente:', file.name);
  }

}

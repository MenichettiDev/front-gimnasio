import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CboGimnasioComponent } from "../../../components/cbo-gimnasio/cbo-gimnasio.component";

@Component({
  selector: 'app-cargar-atleta',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CboGimnasioComponent],
  templateUrl: './cargar-atleta.component.html',
  styleUrl: './cargar-atleta.component.css'
})
export class CargarAtletaComponent implements OnInit {

  atletaForm!: FormGroup ;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.atletaForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', Validators.required],
      apodo: [''],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      celular: [''],
      direccion: [''],
      email: ['', [Validators.required, Validators.email]],
      id_gimnasio: [null],
      foto_archivo: [''],
    });
  }

  onSubmit(): void {
    if (this.atletaForm.valid) {
      const atletaData = this.atletaForm.value;
      console.log('Datos del atleta:', atletaData);

      // Aquí puedes enviar los datos al backend o realizar otras acciones
    } else {
      console.error('El formulario no es válido');
    }
  }
}

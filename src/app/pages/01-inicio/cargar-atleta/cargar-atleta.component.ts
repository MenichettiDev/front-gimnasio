import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CboGimnasioComponent } from "../../../components/cbo-gimnasio/cbo-gimnasio.component";
import { AuthService } from '../../../service/auth/auth.service';
import { Entrenador } from '../../../data/interfaces/entrenadorInterface';
import { EntrenadorService } from '../../../service/entrenador.service';
import { Persona } from '../../../data/interfaces/tbPersonaInterface';

@Component({
  selector: 'app-cargar-atleta',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CboGimnasioComponent],
  templateUrl: './cargar-atleta.component.html',
  styleUrl: './cargar-atleta.component.css'
})
export class CargarAtletaComponent implements OnInit {

  atletaForm!: FormGroup ;
  usuario : Persona | null = null;

  constructor(private fb: FormBuilder,private authService : AuthService, private entrenadorService : EntrenadorService) { }

  ngOnInit(): void {
    
    this.usuario  = this.authService.getUser().usuario[0];
    console.log(this.usuario!.id_persona , '   usuario');
    
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
    if (this.atletaForm.valid && this.usuario ) {
      const atletaData = this.atletaForm.value;
      

      this.entrenadorService.getEntrenadorById(this.usuario?.id_persona).subscribe(
        (data) => {
          atletaData.id_entrenador = data.id_entrenador;
          
        }
      )
      
      console.log('Datos del atleta:', atletaData);
      // Aquí puedes enviar los datos al backend o realizar otras acciones
    } else {
      console.error('El formulario no es válido');
    }
  }
}

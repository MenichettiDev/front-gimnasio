import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    // Inicializa loginForm aquí
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // No es necesario volver a inicializar loginForm en ngOnInit
  }

  onSubmit(): void {
    if (this.loginForm?.valid) {
      const { usuario, contrasenia } = this.loginForm.value;

      this.http.post('http://localhost:7000/login', { usuario, contrasenia })
        .subscribe(
          (response) => {
            this.authService.saveUser(response);
            // Redirige al usuario a la página de inicio
            // this.router.navigate(['/inicio/resumen']);
            window.location.href = '/inicio/resumen';
          },
          (error) => {
            console.error('Error de login', error);
            if (error.status === 401) {
              // Error de credenciales incorrectas
              this.errorMessage = 'Credenciales incorrectas.';
            } else {
              // Error general
              this.errorMessage = 'Hubo un problema al intentar iniciar sesión. Por favor, intente nuevamente.';
            }
          }
        );
    } else {
      // Marcar los campos como tocados para que se apliquen los estilos de error (animación de vibración)
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        if (control?.invalid) {
          control?.markAsTouched(); // Marca el control como tocado
        }
      });
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }

  // Método para verificar si un campo está inválido y tocado
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control?.invalid && control?.touched ? true : false;
  }
  // Método para manejar el cierre del formulario y navegar al home
  closeLogin() {
    this.router.navigate(['/']); // Navega a la página de inicio (home)
  }
}

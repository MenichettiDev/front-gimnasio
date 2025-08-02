
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // No es necesario volver a inicializar loginForm en ngOnInit
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { usuario, contrasenia } = this.loginForm.value;

      this.loginService.login(usuario, contrasenia).subscribe({
        next: (response: any) => {
          // Verifica si el backend indica éxito
          if (!response || !response.success) {
            this.errorMessage = response?.message || 'Error inesperado del servidor.';
            alert(this.errorMessage); // Alerta visible
            return;
          }

          // Guarda el usuario
          this.authService.saveUser(response.usuario[0]);

          // Verifica que el usuario se haya guardado correctamente
          if (!this.authService.isLoggedIn()) {  // ✅ CORRECTO: isLoggedIn() es un método
            this.errorMessage = 'Error al guardar los datos del usuario.';
            alert(this.errorMessage);
            return;
          }

          // Todo bien, redirige
          this.router.navigate(['/inicio/resumen']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);

          if (error.status === 401) {
            this.errorMessage = 'Credenciales incorrectas.';
          } else {
            this.errorMessage = 'Hubo un problema al intentar iniciar sesión. Por favor, intente nuevamente.';
          }

          alert(this.errorMessage); // Alerta visible
        }
      });
    } else {
      // Marca campos como tocados
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });

      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      alert(this.errorMessage); // Alerta para formularios incompletos
    }
  }


  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control?.invalid && control?.touched ? true : false;
  }

  closeLogin() {
    this.router.navigate(['/']); // Navega a la página de inicio (home)
  }
}

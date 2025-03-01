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

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
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
  
      try {
        this.loginService.login(usuario, contrasenia);
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = error.message; // Accede al mensaje de error
        } else {
          this.errorMessage = 'Hubo un problema al intentar iniciar sesión. Por favor, intente nuevamente.';
        }
      }
    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        if (control?.invalid) {
          control?.markAsTouched();
        }
      });
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {


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
            this.router.navigate(['/main']);
          },
          (error) => {
            console.error('Error de login', error);
            this.errorMessage = 'Credenciales incorrectas.';
          }
        );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    } 
  }
}

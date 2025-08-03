import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-olvido-pass',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './olvido-pass.component.html',
  styleUrl: './olvido-pass.component.css'
})
export class OlvidoPassComponent {
  olvidoForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.olvidoForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.olvidoForm.valid) {
      const { email } = this.olvidoForm.value;
      // Simulación de petición HTTP, reemplaza por tu endpoint real
      this.http.post('/api/olvido-pass', { email }).subscribe({
        next: () => {
          this.successMessage = 'Si el correo existe, recibirás instrucciones para recuperar tu contraseña.';
          this.errorMessage = null;
        },
        error: () => {
          this.errorMessage = 'Hubo un problema. Intenta nuevamente.';
          this.successMessage = null;
        }
      });
    } else {
      Object.keys(this.olvidoForm.controls).forEach(field => {
        const control = this.olvidoForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      this.errorMessage = 'Por favor, ingresa un correo válido.';
      this.successMessage = null;
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.olvidoForm.get(field);
    return control?.invalid && control?.touched ? true : false;
  }

  closeOlvido() {
    this.router.navigate(['/login/login']);
  }
}

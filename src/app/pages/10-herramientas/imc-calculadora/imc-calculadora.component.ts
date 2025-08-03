import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ImcRango {
  nombre: string;
  min: number;
  max: number;
  color: string;
}

@Component({
  selector: 'app-imc-calculadora',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './imc-calculadora.component.html',
  styleUrls: ['./imc-calculadora.component.css']
})
export class ImcCalculadoraComponent {
  imcForm: FormGroup;
  resultado: number | null = null;
  categoria: string = '';
  color: string = '';
  rangos: ImcRango[] = [
    { nombre: 'Bajo peso', min: 0, max: 18.49, color: '#f44336' },
    { nombre: 'Normal', min: 18.5, max: 24.99, color: '#4CAF50' },
    { nombre: 'Sobrepeso', min: 25, max: 29.99, color: '#ff9800' },
    { nombre: 'Obesidad', min: 30, max: 100, color: '#9c27b0' }
  ];

  constructor(private fb: FormBuilder) {
    this.imcForm = this.fb.group({
      peso: ['', [Validators.required, Validators.min(1)]], // kg
      altura: ['', [Validators.required, Validators.min(0.5)]], // metros
    });
  }

  calcularIMC() {
    if (this.imcForm.valid) {
      const peso = this.imcForm.value.peso;
      const altura = this.imcForm.value.altura;
      const imc = peso / (altura * altura);
      this.resultado = parseFloat(imc.toFixed(2));
      const rango = this.rangos.find(r => this.resultado! >= r.min && this.resultado! <= r.max);
      this.categoria = rango ? rango.nombre : '';
      this.color = rango ? rango.color : '#fff';
    } else {
      this.resultado = null;
      this.categoria = '';
      this.color = '';
      Object.keys(this.imcForm.controls).forEach(field => {
        const control = this.imcForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  getCategoria(imc: number): string {
    if (imc < 18.5) return 'Bajo peso';
    if (imc < 25) return 'Normal';
    if (imc < 30) return 'Sobrepeso';
    return 'Obesidad';
  }
}
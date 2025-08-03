import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calorias-calculadora',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './calorias-calculadora.component.html',
  styleUrls: ['./calorias-calculadora.component.css']
})
export class CaloriasCalculadoraComponent {
  caloriasForm: FormGroup;
  resultado: number | null = null;
  objetivo: string = '';

  actividadOptions = [
    { value: 1.2, label: 'Sedentario (poco o ningún ejercicio)' },
    { value: 1.375, label: 'Ligero (ejercicio ligero 1-3 días/semana)' },
    { value: 1.55, label: 'Moderado (ejercicio moderado 3-5 días/semana)' },
    { value: 1.725, label: 'Intenso (ejercicio intenso 6-7 días/semana)' },
    { value: 1.9, label: 'Muy intenso (ejercicio físico diario o trabajo físico)' }
  ];

  constructor(private fb: FormBuilder) {
    this.caloriasForm = this.fb.group({
      sexo: ['masculino', Validators.required],
      edad: ['', [Validators.required, Validators.min(10), Validators.max(100)]],
      peso: ['', [Validators.required, Validators.min(30), Validators.max(300)]], // kg
      altura: ['', [Validators.required, Validators.min(1), Validators.max(2.5)]], // metros
      actividad: [1.2, Validators.required]
    });
  }

  calcularCalorias() {
    if (this.caloriasForm.valid) {
      const { sexo, edad, peso, altura, actividad } = this.caloriasForm.value;
      // Mifflin-St Jeor (peso en kg, altura en cm, edad en años)
      const alturaCm = altura * 100;
      let bmr = 0;
      if (sexo === 'masculino') {
        bmr = 10 * peso + 6.25 * alturaCm - 5 * edad + 5;
      } else {
        bmr = 10 * peso + 6.25 * alturaCm - 5 * edad - 161;
      }
      this.resultado = Math.round(bmr * actividad);

      // Sugerencia de objetivo
      if (this.resultado < 1800) {
        this.objetivo = 'Mantener peso o ganar masa muscular';
      } else if (this.resultado < 2500) {
        this.objetivo = 'Mantener peso o perder grasa';
      } else {
        this.objetivo = 'Alto gasto calórico, ideal para deportistas o trabajos físicos';
      }
    } else {
      this.resultado = null;
      this.objetivo = '';
      Object.keys(this.caloriasForm.controls).forEach(field => {
        const control = this.caloriasForm.get(field);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}

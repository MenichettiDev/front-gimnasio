import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cronometro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css']
})
export class CronometroComponent {
  configForm: FormGroup;
  tiempoRestante: number = 0;
  intervalo: any = null;
  corriendo: boolean = false;
  serieActual: number = 1;
  modoDescanso: boolean = false;
  terminado: boolean = false;

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      series: [3, [Validators.required, Validators.min(1)]],
      tiempoSerie: [30, [Validators.required, Validators.min(1)]], // segundos
      descanso: [15, [Validators.required, Validators.min(0)]], // segundos
    });
  }

  iniciar() {
    if (this.configForm.invalid) return;
    this.serieActual = 1;
    this.modoDescanso = false;
    this.terminado = false;
    this.tiempoRestante = this.configForm.value.tiempoSerie;
    this.corriendo = true;
    this.iniciarIntervalo();
  }

  iniciarIntervalo() {
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        if (!this.modoDescanso) {
          // Termina serie, inicia descanso si corresponde
          if (this.configForm.value.descanso > 0) {
            this.modoDescanso = true;
            this.tiempoRestante = this.configForm.value.descanso;
          } else {
            this.siguienteSerie();
          }
        } else {
          // Termina descanso, siguiente serie
          this.siguienteSerie();
        }
      }
    }, 1000);
  }

  siguienteSerie() {
    this.modoDescanso = false;
    if (this.serieActual < this.configForm.value.series) {
      this.serieActual++;
      this.tiempoRestante = this.configForm.value.tiempoSerie;
    } else {
      this.terminar();
    }
  }

  pausar() {
    this.corriendo = false;
    clearInterval(this.intervalo);
  }

  reanudar() {
    if (!this.corriendo && !this.terminado) {
      this.corriendo = true;
      this.iniciarIntervalo();
    }
  }

  reiniciar() {
    this.pausar();
    this.serieActual = 1;
    this.modoDescanso = false;
    this.terminado = false;
    this.tiempoRestante = this.configForm.value.tiempoSerie;
  }

  terminar() {
    this.corriendo = false;
    this.terminado = true;
    clearInterval(this.intervalo);
  }

  get tiempoMinSec(): string {
    const min = Math.floor(this.tiempoRestante / 60);
    const sec = this.tiempoRestante % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
}

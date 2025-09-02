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
  tiempoRestante: number = 0; // usado por countdown, intervals, emom (segundos)
  tiempoTranscurrido: number = 0; // usado por modo simple (segundos, cuenta hacia arriba)
  intervalo: any = null;
  corriendo: boolean = false;
  serieActual: number = 1;
  modoDescanso: boolean = false;
  terminado: boolean = false;
  emomRonda: number = 1;

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      mode: ['intervals', Validators.required], // 'simple' | 'intervals' | 'emom' | 'countdown'
      // para intervals (compatibilidad con lo existente)
      series: [3, [Validators.min(1)]],
      tiempoSerie: [30, [Validators.min(1)]], // segundos
      descanso: [15, [Validators.min(0)]], // segundos
      // para simple (stopwatch)
      simpleDuration: [300, [Validators.min(1)]], // valor por defecto opcional
      // para EMOM
      emomRounds: [10, [Validators.min(1)]], // número de minutos/rondas
      // para Countdown
      countdownDuration: [1200, [Validators.min(1)]] // segundos totales
    });
  }

  // nuevo: seleccionar modo desde la cuadrícula
  selectMode(mode: string) {
    this.configForm.patchValue({ mode });
    this.onModeChange();
  }

  // Called when the select mode changes: pausa y reinicia vista si hace falta
  onModeChange() {
    this.pausar();
    this.terminado = false;
    this.serieActual = 1;
    this.modoDescanso = false;
    this.tiempoTranscurrido = 0;
    this.emomRonda = 1;
    // preconfigurar valores visibles según modo
    const mode = this.configForm.value.mode;
    if (mode === 'intervals') {
      this.tiempoRestante = this.configForm.value.tiempoSerie;
    } else if (mode === 'countdown') {
      this.tiempoRestante = this.configForm.value.countdownDuration;
    } else if (mode === 'emom') {
      this.tiempoRestante = 60;
    } else {
      this.tiempoRestante = 0;
    }
  }

  iniciar() {
    const mode = this.configForm.value.mode;
    // validación básica por modo
    if (mode === 'simple') {
      if (this.configForm.get('simpleDuration')?.invalid) return;
      this.startSimple(true); // inicio con reset
    } else if (mode === 'intervals') {
      if (this.configForm.get('series')?.invalid || this.configForm.get('tiempoSerie')?.invalid || this.configForm.get('descanso')?.invalid) return;
      this.serieActual = 1;
      this.modoDescanso = false;
      this.terminado = false;
      this.tiempoRestante = this.configForm.value.tiempoSerie;
      this.corriendo = true;
      this.startIntervalLoop();
    } else if (mode === 'emom') {
      if (this.configForm.get('emomRounds')?.invalid) return;
      this.emomRonda = 1;
      this.tiempoRestante = 60;
      this.terminado = false;
      this.corriendo = true;
      this.startEmomLoop();
    } else if (mode === 'countdown') {
      if (this.configForm.get('countdownDuration')?.invalid) return;
      this.tiempoRestante = this.configForm.value.countdownDuration;
      this.terminado = false;
      this.corriendo = true;
      this.startCountdownLoop();
    }
  }

  // startSimple ahora acepta reset: si reset=true pone tiempo a 0, si false respeta tiempoTranscurrido (reanudar)
  startSimple(reset: boolean = true) {
    clearInterval(this.intervalo);
    if (reset) this.tiempoTranscurrido = 0;
    this.terminado = false;
    this.corriendo = true;
    this.intervalo = setInterval(() => {
      this.tiempoTranscurrido++;
    }, 1000);
  }

  startIntervalLoop() {
    // evita duplicar intervalos
    clearInterval(this.intervalo);
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
            this.nextSerie();
          }
        } else {
          // Termina descanso, siguiente serie
          this.nextSerie();
        }
      }
    }, 1000);
  }

  nextSerie() {
    this.modoDescanso = false;
    if (this.serieActual < this.configForm.value.series) {
      this.serieActual++;
      this.tiempoRestante = this.configForm.value.tiempoSerie;
    } else {
      this.terminar();
    }
  }

  startEmomLoop() {
    clearInterval(this.intervalo);
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        // inicio de siguiente minuto / ronda
        if (this.emomRonda < this.configForm.value.emomRounds) {
          this.emomRonda++;
          this.tiempoRestante = 60;
        } else {
          this.terminar();
        }
      }
    }, 1000);
  }

  startCountdownLoop() {
    clearInterval(this.intervalo);
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        this.terminar();
      }
    }, 1000);
  }

  pausar() {
    // pausar debe detener intervalos pero mantener tiempos (especialmente simple)
    this.corriendo = false;
    clearInterval(this.intervalo);
    this.intervalo = null;
  }

  reanudar() {
    if (this.corriendo || this.terminado) return;
    const mode = this.configForm.value.mode;
    // para simple -> reanudar sin reset
    if (mode === 'simple') {
      this.startSimple(false);
      return;
    }
    this.corriendo = true;
    if (mode === 'intervals') {
      this.startIntervalLoop();
    } else if (mode === 'emom') {
      this.startEmomLoop();
    } else if (mode === 'countdown') {
      this.startCountdownLoop();
    }
  }

  reiniciar() {
    this.pausar();
    this.terminado = false;
    this.serieActual = 1;
    this.modoDescanso = false;
    this.emomRonda = 1;
    this.tiempoTranscurrido = 0;
    // reestablecer tiempo según modo
    const mode = this.configForm.value.mode;
    if (mode === 'simple') {
      this.tiempoRestante = 0;
    } else if (mode === 'intervals') {
      this.tiempoRestante = this.configForm.value.tiempoSerie;
    } else if (mode === 'emom') {
      this.tiempoRestante = 60;
    } else if (mode === 'countdown') {
      this.tiempoRestante = this.configForm.value.countdownDuration;
    }
  }

  terminar() {
    this.corriendo = false;
    this.terminado = true;
    clearInterval(this.intervalo);
    this.intervalo = null;
  }

  get tiempoMinSec(): string {
    // muestra tiempo formateado según modo: simple -> tiempoTranscurrido, otros -> tiempoRestante
    const total = (this.configForm.value.mode === 'simple') ? this.tiempoTranscurrido : this.tiempoRestante;
    const min = Math.floor(total / 60);
    const sec = total % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
}

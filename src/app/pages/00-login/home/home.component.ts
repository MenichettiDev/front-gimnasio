import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  private intervalId: any;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startCountdown(): void {
    const targetDate = new Date('2025-05-10T00:00:00Z').getTime();

    this.intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeRemaining = targetDate - now;

      if (timeRemaining <= 0) {
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        clearInterval(this.intervalId);
        return;
      }

      // Guardar valores anteriores
      const prevDays = this.days;
      const prevHours = this.hours;
      const prevMinutes = this.minutes;

      // Calcular nuevos valores
      this.days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // Activar animación si los valores cambian
      if (prevDays !== this.days) this.triggerFlip('days');
      if (prevHours !== this.hours) this.triggerFlip('hours');
      if (prevMinutes !== this.minutes) this.triggerFlip('minutes');
    }, 1000);
  }

  private triggerFlip(unit: string): void {
    const element = document.querySelector(`.${unit}-flip`);
    if (element) {
      // Aplicar la clase flipped
      element.classList.add('flipped');

      // Esperar a que termine la animación antes de eliminar la clase
      setTimeout(() => {
        element.classList.remove('flipped');
      }, 600); // Duración de la animación
    }
  }
}

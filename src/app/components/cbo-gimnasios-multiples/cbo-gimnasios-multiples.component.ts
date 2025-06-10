import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GimnasioService } from '../../service/gimnasio.service';
import { Gimnasio } from '../../data/interfaces/gimnasioInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cbo-gimnasios-multiples',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cbo-gimnasios-multiples.component.html',
  styleUrls: ['./cbo-gimnasios-multiples.component.css']
})
export class CboGimnasiosMultiplesComponent implements OnInit {
  @Input() label: string = 'Selecciona uno o más gimnasios';
  @Input() isDisabled: boolean = false;
  @Input() selected: number[] = [];
  @Output() valueChange = new EventEmitter<number[]>();

  gimnasios: Gimnasio[] = [];

  constructor(private gimnasioService: GimnasioService) { }

  ngOnInit(): void {
    this.gimnasioService.getGimnasios().subscribe({
      next: (data) => this.gimnasios = data,
      error: (err) => console.error('Error al obtener gimnasios', err)
    });
  }

  onChange(): void {
    this.valueChange.emit(this.selected);
  }
}
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-toast.component.html',
  styleUrls: ['./modal-toast.component.css']
})
export class ModalToastComponent {
  @Input() message: string = '';
  @Input() isVisible: boolean = false;
  @Input() type: string = 'success';
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from '../../../components/modal/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalConfirmComponent],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css'
})
export class RegistroUsuarioComponent implements OnInit {
  registroForm!: FormGroup;
  isModalVisible: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      celular: [''],
      direccion: [''],
      fecha_nacimiento: ['', Validators.required],
    });
  }

  openModal(): void {
    if (this.registroForm.valid) {
      this.isModalVisible = true;
    } else {
      alert('Por favor complete todos los campos obligatorios.');
    }
  }

  handleConfirm(): void {
    // Aquí iría la lógica para registrar el usuario (servicio)
    alert('¡Usuario registrado exitosamente!');
    this.isModalVisible = false;
    this.registroForm.reset();
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }
}
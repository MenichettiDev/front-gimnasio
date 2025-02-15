import { Component, Input, forwardRef, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormaPagoService } from '../../service/forma-pago.service';
import { FormaPago } from '../../data/interfaces/tbFormaPagoInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cbo-forma-pago',
  templateUrl: './cbo-forma-pago.component.html',
  styleUrls: ['./cbo-forma-pago.component.css'],
  imports: [FormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CboFormasPagoComponent),
      multi: true,
    },
  ],
})
export class CboFormasPagoComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = "Selecciona una forma de pago"; // Para el label del combo
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  formasPago: FormaPago[] = []; // Lista de formas de pago
  selectedFormaPago: FormaPago | null = null; // Valor seleccionado (objeto forma de pago)
  isDisabled: boolean = false; // Estado de deshabilitado

  // Funciones de callback registradas por Angular
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private formaPagoService: FormaPagoService) {}

  ngOnInit(): void {
    this.obtenerFormasPago();
  }

  // Método para obtener las formas de pago
  obtenerFormasPago(): void {
    this.formaPagoService.getFormasPago().subscribe(
      (data) => {
        this.formasPago = data; // Asignamos los datos de las formas de pago
        console.log('Formas de pago obtenidas', this.formasPago);
      },
      (error) => {
        console.error('Error al obtener formas de pago', error);
      }
    );
  }

  // Maneja cambios en el select
  onValueChange(): void {
    const idFormaPago = this.selectedFormaPago?.id_forma_pago || undefined; // Obtiene el ID de la forma de pago
    this.valueChange.emit(idFormaPago); // Emite el ID al padre
    this.onChange(idFormaPago); // Notifica a Angular sobre el cambio
    this.onTouched(); // Marca el control como "tocado"
  }

  // Métodos de ControlValueAccessor
  writeValue(value: any): void {
    this.selectedFormaPago = value || null; // Actualiza el valor interno
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled; // Habilita/deshabilita el control
  }
}
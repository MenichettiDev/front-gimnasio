import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar ngModel y otras directivas comunes
import { FormsModule } from '@angular/forms';
import { BuscarRutinaComponent } from "../../../components/Rutinas/buscar-rutina/buscar-rutina.component"; // Para habilitar ngModel en formularios
import { plan, rutinaArmada } from '../../../data/interfaces/rutinaArmadaInterface';
import { MostrarRutinasComponent } from "../../../components/Rutinas/mostrar-rutinas/mostrar-rutinas.component";
import { EditarRutinaComponent } from "../../../components/Rutinas/editar-rutina/editar-rutina.component";

@Component({
    selector: 'app-reaplicar-rutina',
    imports: [BuscarRutinaComponent, MostrarRutinasComponent, CommonModule, FormsModule, EditarRutinaComponent],
    templateUrl: './reaplicar-rutina.component.html',
    styleUrl: './reaplicar-rutina.component.css'
})
export class ReaplicarRutinaComponent {

    rutinasFiltradas: plan[] = [];
    rutinaSeleccionada: rutinaArmada | null = null; // Rutina seleccionada para editar
    formularioHabilitado: boolean = false; // Controla si el formulario está habilitado

    manejarRutinasEncontradas(rutinas: any[]) {
        console.log('Rutinas recibidas:', rutinas);
        // Aquí puedes mostrar las rutinas en una tabla o realizar otras acciones
        this.rutinasFiltradas = rutinas;
    }

    manejarFiltrosAceptados(filtros: any) {
        // console.log('Filtros aceptados:', filtros);
        // Aquí puedes guardar los filtros o realizar otras acciones
    }

    onEditarRutina(rutina: rutinaArmada): void {
        // Almacena la rutina seleccionada
        this.rutinaSeleccionada = rutina;
        this.formularioHabilitado = true; // Habilitar el formulario
        console.log('Rutina seleccionada para editar:', this.rutinaSeleccionada);
    }

}
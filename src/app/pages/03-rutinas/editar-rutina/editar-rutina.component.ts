import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para usar ngModel y otras directivas comunes
import { FormsModule } from '@angular/forms';
import { BuscarRutinaComponent } from "../../../components/Rutinas/buscar-rutina/buscar-rutina.component"; // Para habilitar ngModel en formularios



@Component({
    selector: 'app-editar-rutina',
    standalone: true,
    templateUrl: './editar-rutina.component.html',
    styleUrls: ['./editar-rutina.component.css'],
    imports: [
        CommonModule, FormsModule,
        BuscarRutinaComponent
    ],
})
export class EditarRutinaComponent {


    manejarRutinasEncontradas(rutinas: any[]) {
        console.log('Rutinas recibidas:', rutinas);
        // Aquí puedes mostrar las rutinas en una tabla o realizar otras acciones
    }

    manejarFiltrosAceptados(filtros: any) {
        console.log('Filtros aceptados:', filtros);
        // Aquí puedes guardar los filtros o realizar otras acciones
    }

}
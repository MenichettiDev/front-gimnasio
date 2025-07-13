import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinasService } from '../../../service/rutinas.service';
import { plan } from '../../../data/interfaces/rutinaArmadaInterface';
import { VisorRutinaComponent as VisorRutinaDisplayComponent } from '../../../components/Rutinas/visor-rutina/visor-rutina.component';

@Component({
    selector: 'app-visor-rutina-page',
    standalone: true,
    imports: [CommonModule, VisorRutinaDisplayComponent],
    templateUrl: './visor-rutina.component.html',
    styleUrls: ['./visor-rutina.component.css']
})
export class VisorRutinaComponent implements OnInit {

    rutinaCruda: plan | null = null;
    idRutina: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private rutinasService: RutinasService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.idRutina = +params['id'];
            if (this.idRutina) {
                this.obtenerRutinaPorId(this.idRutina);
            }
        });
    }

    obtenerRutinaPorId(id_rutina: number): void {
        this.rutinasService.getRutinaByIdRutina(id_rutina).subscribe({
            next: (rutina: plan) => {
                this.rutinaCruda = rutina;
            },
            error: (error) => {
                console.error('Error al obtener la rutina:', error);
            }
        });
    }

    volver(): void {
        this.router.navigate(['/rutinas/mis-rutinas']);
    }
}

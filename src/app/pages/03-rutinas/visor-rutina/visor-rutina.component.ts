import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, Injector, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RutinasService } from '../../../service/rutinas.service';
import { plan } from '../../../data/interfaces/rutinaArmadaInterface';
import { VisorRutinaComponent as VisorRutinaDisplayComponent } from '../../../components/Rutinas/visor-rutina/visor-rutina.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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

    @ViewChild(VisorRutinaDisplayComponent)
    visorRutinaComponent!: VisorRutinaDisplayComponent;

    // Agrega referencia al ViewContainerRef para renderizar el template de exportación
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private rutinasService: RutinasService,
        private viewContainerRef: ViewContainerRef,
        private injector: Injector
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

    descargarPDF(): void {
        const exportDiv = document.createElement('div');
        exportDiv.style.position = 'fixed';
        exportDiv.style.top = '-9999px';
        exportDiv.style.left = '-9999px';
        exportDiv.style.width = '210mm';
        exportDiv.style.background = 'white';
        document.body.appendChild(exportDiv);

        // Importa el componente PDF desde la carpeta correcta
        import('./pdf-rutina/pdf-rutina.component').then(({ PdfRutinaComponent }) => {
            const componentRef: ComponentRef<any> = this.viewContainerRef.createComponent(PdfRutinaComponent, {
                injector: this.injector,
            });
            componentRef.instance.rutinaCruda = this.rutinaCruda;
            exportDiv.appendChild(componentRef.location.nativeElement as HTMLElement);

            setTimeout(() => {
                html2canvas(exportDiv).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();

                    const imgWidth = canvas.width;
                    const imgHeight = canvas.height;
                    const pdfImgWidth = pdfWidth;
                    const pdfImgHeight = (imgHeight * pdfWidth) / imgWidth;

                    let position = 0;
                    if (pdfImgHeight <= pdfHeight) {
                        pdf.addImage(imgData, 'PNG', 0, 0, pdfImgWidth, pdfImgHeight);
                    } else {
                        while (position < pdfImgHeight) {
                            pdf.addImage(
                                imgData,
                                'PNG',
                                0,
                                -position,
                                pdfImgWidth,
                                pdfImgHeight
                            );
                            position += pdfHeight;
                            if (position < pdfImgHeight) {
                                pdf.addPage();
                            }
                        }
                    }
                    pdf.save(`${this.rutinaCruda?.rutina.nombre || 'rutina'}.pdf`);
                    document.body.removeChild(exportDiv);
                    componentRef.destroy();
                });
            }, 500);
        });
    }
}
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

    async descargarPDF(rutina: plan | null): Promise<void> {
        if (!rutina) return;
        const exportDiv = document.createElement('div');
        exportDiv.style.position = 'fixed';
        exportDiv.style.top = '-9999px';
        exportDiv.style.left = '-9999px';
        exportDiv.style.width = '210mm';
        exportDiv.style.background = 'white';
        exportDiv.style.padding = '10mm'; // margen pequeño
        exportDiv.style.boxSizing = 'border-box';
        document.body.appendChild(exportDiv);

        // helper: convierte posibles url(...) relativas a absolutas según la hoja original
        const absolutizeCssUrls = (cssText: string, baseHref: string) => {
            return cssText.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (m, quote, url) => {
                const trimmed = url.trim();
                if (/^(data:|https?:|\/\/)/i.test(trimmed)) {
                    return `url("${trimmed}")`;
                }
                try {
                    const absolute = new URL(trimmed, baseHref).toString();
                    return `url("${absolute}")`;
                } catch {
                    return `url("${trimmed}")`;
                }
            });
        };

        // descarga e inyecta css externo como <style> dentro del contenedor; también clona <style> inline
        const inlineExternalStyles = async (container: HTMLElement) => {
            const linkNodes = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
            const styleNodes = Array.from(document.querySelectorAll('style')) as HTMLStyleElement[];

            for (const link of linkNodes) {
                if (!link.href) continue;
                try {
                    const resp = await fetch(link.href);
                    if (!resp.ok) continue;
                    let cssText = await resp.text();
                    cssText = absolutizeCssUrls(cssText, link.href);
                    const styleEl = document.createElement('style');
                    styleEl.textContent = cssText;
                    container.appendChild(styleEl);
                } catch (e) {
                    console.warn('No se pudo obtener hoja de estilo:', link.href, e);
                }
            }

            for (const style of styleNodes) {
                try {
                    const clone = style.cloneNode(true) as HTMLStyleElement;
                    container.appendChild(clone);
                } catch (e) {
                    console.warn('No se pudo clonar style inline:', e);
                }
            }
        };

        // espera a que todas las imágenes dentro del contenedor se carguen o fallen
        const waitForImages = (container: HTMLElement, timeout = 8000) => {
            const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
            if (imgs.length === 0) return Promise.resolve();
            return new Promise<void>((resolve) => {
                let remaining = imgs.length;
                const done = () => {
                    remaining--;
                    if (remaining <= 0) resolve();
                };
                imgs.forEach(img => {
                    if (img.complete) {
                        done();
                    } else {
                        img.addEventListener('load', done, { once: true });
                        img.addEventListener('error', done, { once: true });
                    }
                });
                setTimeout(() => resolve(), timeout);
            });
        };

        await inlineExternalStyles(exportDiv);

        try {
            // Importa y crea el componente de PDF
            const module = await import('./pdf-rutina/pdf-rutina.component');
            const PdfRutinaComponent = (module as any).PdfRutinaComponent;
            const componentRef: ComponentRef<any> = this.viewContainerRef.createComponent(PdfRutinaComponent, {
                injector: this.injector,
            });

            // asigna datos y fuerza render
            componentRef.instance.rutinaCruda = rutina;
            componentRef.changeDetectorRef.detectChanges();

            const compEl = componentRef.location.nativeElement as HTMLElement;
            compEl.style.width = '210mm';
            compEl.style.boxSizing = 'border-box';
            compEl.style.display = 'block';
            exportDiv.appendChild(compEl);

            // Esperar a que se resuelvan los datos antes de continuar
            let intentos = 0;
            while (!componentRef.instance.datosResueltos && intentos < 50) {
                await new Promise(resolve => setTimeout(resolve, 100));
                intentos++;
            }

            // convierte todas las imágenes dentro del contenedor a data URLs para evitar 404/CORS
            const inlineImages = async (container: HTMLElement) => {
                const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
                await Promise.all(imgs.map(async img => {
                    try {
                        const src = img.getAttribute('src') || '';
                        if (!src) return;
                        // normaliza URL relativa a absoluta
                        const abs = new URL(src, document.baseURI).toString();
                        // si ya es data:, no tocar
                        if (abs.startsWith('data:')) return;
                        const resp = await fetch(abs);
                        if (!resp.ok) return;
                        const blob = await resp.blob();
                        // leer blob como data URL
                        const dataUrl = await new Promise<string>((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result as string);
                            reader.onerror = reject;
                            reader.readAsDataURL(blob);
                        });
                        img.src = dataUrl;
                    } catch (e) {
                        // en caso de error, no impedir el resto
                        console.warn('No se pudo inlinear imagen:', e);
                    }
                }));
            };

            // Esperar un poco y luego inlinear imágenes (antes de esperar su carga)
            await new Promise(resolve => setTimeout(resolve, 200));
            await inlineImages(exportDiv);

            // esperar a que imágenes y fuentes se carguen
            await new Promise(resolve => setTimeout(resolve, 500)); // breve espera inicial
            await waitForImages(exportDiv, 10000);
            await new Promise(resolve => setTimeout(resolve, 300)); // extra para fuentes

            const canvas = await html2canvas(exportDiv, {
                scale: 2,
                useCORS: true,
                logging: false,
                allowTaint: true,
                backgroundColor: null,
                x: 0,
                y: 0,
                scrollX: 0,
                scrollY: 0
            });
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
            pdf.save(`${rutina?.rutina.nombre || 'rutina'}.pdf`);

            // limpieza
            componentRef.destroy();
            if (document.body.contains(exportDiv)) {
                document.body.removeChild(exportDiv);
            }
        } catch (error) {
            console.error('Error generando PDF:', error);
            if (document.body.contains(exportDiv)) {
                document.body.removeChild(exportDiv);
            }
        }
    }
}
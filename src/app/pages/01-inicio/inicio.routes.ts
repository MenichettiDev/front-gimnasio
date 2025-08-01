import { Routes } from '@angular/router';

// Rutas para la sección "Rutinas"
export const inicioRoutes: Routes = [
    { path: '', loadComponent: () => import('./resumen/resumen.component').then(m => m.ResumenComponent) },
    { path: 'resumen', loadComponent: () => import('./resumen/resumen.component').then(m => m.ResumenComponent) },
    { path: 'noticias', loadComponent: () => import('./noticias/noticias.component').then(m => m.NoticiasComponent) },
    { path: 'cargar-pago', loadComponent: () => import('./cargar-pago/cargar-pago.component').then(m => m.CargarPagoComponent) },
    { path: 'relaciones', loadComponent: () => import('./relaciones/relaciones.component').then(m => m.RelacionesComponent) },
    { path: 'relaciones-vista', loadComponent: () => import('./relaciones-vista/relaciones-vista.component').then(m => m.RelacionesVistaComponent) }
];

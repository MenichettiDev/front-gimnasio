import { Routes } from '@angular/router';

// Rutas para la sección "Rutinas"
export const inicioRoutes: Routes = [
    { path: '', loadComponent: () => import('./resumen/resumen.component').then(m => m.ResumenComponent) },
    { path: 'resumen', loadComponent: () => import('./resumen/resumen.component').then(m => m.ResumenComponent) },
    { path: 'noticias', loadComponent: () => import('./noticias/noticias.component').then(m => m.NoticiasComponent) },
    { path: 'cargar-atleta', loadComponent: () => import('./cargar-atleta/cargar-atleta.component').then(m => m.CargarAtletaComponent) },
    { path: 'cargar-entrenador', loadComponent: () => import('./cargar-entrenador/cargar-entrenador.component').then(m => m.CargarEntrenadorComponent) },
    { path: 'cargar-pago', loadComponent: () => import('./cargar-pago/cargar-pago.component').then(m => m.CargarPagoComponent) }
];

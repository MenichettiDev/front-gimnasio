import { Routes } from '@angular/router';

// Rutas para la sección "Asistencia"
export const asistenciaRoutes: Routes = [
    // Ruta principal para la sección "Asistencia"
    { path: '', loadComponent: () => import('./asistencia/asistencia.component').then(m => m.AsistenciaComponent) },

    // Rutas para los diferentes componentes de Asistencia
    { path: 'asistencia', loadComponent: () => import('./asistencia/asistencia.component').then(m => m.AsistenciaComponent) },
    { path: 'historial', loadComponent: () => import('./historial/historial.component').then(m => m.HistorialComponent) },
    { path: 'coach', loadComponent: () => import('./coach/coach.component').then(m => m.CoachComponent) }
];

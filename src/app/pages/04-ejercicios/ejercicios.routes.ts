import { Routes } from '@angular/router';

// Rutas para la sección "Ejercicios"
export const ejerciciosRoutes: Routes = [
    // Ruta principal para la sección "Ejercicios"
    { path: '', loadComponent: () => import('./buscar/buscar.component').then(m => m.BuscarComponent) },

    // Rutas para los diferentes componentes de Ejercicios
    { path: 'buscar', loadComponent: () => import('./buscar/buscar.component').then(m => m.BuscarComponent) },
    { path: 'cargar-nuevo', loadComponent: () => import('./cargar-nuevo/cargar-nuevo.component').then(m => m.CargarNuevoComponent) },

    { path: 'editar-ejercicio', loadComponent: () => import('./editar-ejercicio/editar-ejercicio.component').then(m => m.EditarEjercicioComponent) },
    { path: 'coach', loadComponent: () => import('./coach/coach.component').then(m => m.CoachComponent) }
];

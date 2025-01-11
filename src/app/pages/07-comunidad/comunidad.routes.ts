import { Routes } from '@angular/router';

// Rutas para la sección "Comunidad"
export const comunidadRoutes: Routes = [
    // Ruta principal para la sección "Comunidad" (puedes elegir un componente por defecto)
    { path: '', loadComponent: () => import('./articulos/articulos.component').then(m => m.ArticulosComponent) },

    // Rutas para los diferentes componentes de Comunidad
    { path: 'articulos', loadComponent: () => import('./articulos/articulos.component').then(m => m.ArticulosComponent) },
    { path: 'grupos', loadComponent: () => import('./grupos/grupos.component').then(m => m.GruposComponent) }
];

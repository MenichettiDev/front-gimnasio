import { Routes } from '@angular/router';

// Rutas para la sección "Perfil"
export const perfilRoutes: Routes = [
    // Ruta principal para el componente Perfil
    { path: '', loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent) },

    // Ruta para el componente Coach
    { path: 'coach', loadComponent: () => import('./coach/coach.component').then(m => m.CoachComponent) },
    { path: 'perfil', loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent) },

    // Ruta para el componente Estadísticas
    { path: 'cargar-medidas', loadComponent: () => import('../02-perfil/medidas/medidas.component').then(m => m.MedidasComponent) },
    { path: 'historial-medidas', loadComponent: () => import('../02-perfil/historial-medidas/historial-medidas.component').then(m => m.HistorialMedidasComponent) }
];

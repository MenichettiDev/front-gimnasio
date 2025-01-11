import { Routes } from '@angular/router';

// Rutas para la sección "Perfil"
export const perfilRoutes: Routes = [
    // Ruta principal para el componente Perfil
    { path: '', loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent) },

    // Ruta para el componente Coach
    { path: 'coach', loadComponent: () => import('./coach/coach.component').then(m => m.CoachComponent) },

    // Ruta para el componente Estadísticas
    { path: 'estadisticas', loadComponent: () => import('./estadisticas/estadisticas.component').then(m => m.EstadisticasComponent) }
];

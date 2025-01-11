import { Routes } from '@angular/router';

// Rutas para la sección "Progreso"
export const progresoRoutes: Routes = [
    // Ruta principal para la sección "Progreso" (puedes elegir un componente por defecto, como "EstadisticaComponent")
    { path: '', loadComponent: () => import('./estadisticas/estadisticas.component').then(m => m.EstadisticasComponent) },

    // Rutas para los diferentes componentes de Progreso
    { path: 'estadistica', loadComponent: () => import('./estadisticas/estadisticas.component').then(m => m.EstadisticasComponent) },
    { path: 'metas', loadComponent: () => import('./metas/metas.component').then(m => m.MetasComponent) },
    { path: 'logros', loadComponent: () => import('./logros/logros.component').then(m => m.LogrosComponent) }
];

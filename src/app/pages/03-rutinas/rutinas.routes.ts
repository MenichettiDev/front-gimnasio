import { Routes } from '@angular/router';

// Rutas para la sección "Rutinas"
export const rutinasRoutes: Routes = [
    // Ruta principal para la sección "Rutinas" (podrías mostrar el componente que prefieras aquí)
    { path: '', loadComponent: () => import('./actual/actual.component').then(m => m.ActualComponent) },

    // Rutas para los diferentes componentes de Rutinas
    { path: 'actual', loadComponent: () => import('./actual/actual.component').then(m => m.ActualComponent) },
    { path: 'coach', loadComponent: () => import('./coach/coach.component').then(m => m.CoachComponent) },
    { path: 'crear-rutina', loadComponent: () => import('./crear-rutina/crear-rutina.component').then(m => m.CrearRutinaComponent) },
    { path: 'editar-rutina', loadComponent: () => import('./editar-rutina/editar-rutina.component').then(m => m.EditarRutinaComponent) },
    { path: 'especificas', loadComponent: () => import('./especificas/especificas.component').then(m => m.EspecificasComponent) },
    { path: 'favoritas', loadComponent: () => import('./favoritas/favoritas.component').then(m => m.FavoritasComponent) },
    { path: 'historial', loadComponent: () => import('./historial/historial.component').then(m => m.HistorialComponent) },
    { path: 'mis-rutinas', loadComponent: () => import('./mis-rutinas/mis-rutinas.component').then(m => m.MisRutinasComponent) },
    { path: 'populares', loadComponent: () => import('./populares/populares.component').then(m => m.PopularesComponent) },
    { path: 'recomendadas', loadComponent: () => import('./recomendadas/recomendadas.component').then(m => m.RecomendadasComponent) }
];

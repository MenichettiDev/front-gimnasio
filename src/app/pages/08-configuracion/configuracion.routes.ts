import { Routes } from '@angular/router';

// Rutas para la sección "Configuración"
export const configuracionRoutes: Routes = [
  // Ruta principal para la sección "Configuración" (puedes elegir un componente por defecto)
  { path: '', loadComponent: () => import('./editar-perfil/editar-perfil.component').then(m => m.EditarPerfilComponent) },

  // Rutas para los diferentes componentes de Configuración
  { path: 'editar-perfil', loadComponent: () => import('./editar-perfil/editar-perfil.component').then(m => m.EditarPerfilComponent) },
  { path: 'editar-ejercicio', loadComponent: () => import('./editar-ejercicio/editar-ejercicio.component').then(m => m.EditarEjercicioComponent) },
];

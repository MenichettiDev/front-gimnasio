import { Routes } from '@angular/router';

// Rutas para la sección "Ayuda"
export const ayudaRoutes: Routes = [
    // Ruta principal para la sección "Ayuda" (puedes elegir un componente por defecto)
    { path: '', loadComponent: () => import('./preguntas-frecuentes/preguntas-frecuentes.component').then(m => m.PreguntasFrecuentesComponent) },

    // Rutas para los diferentes componentes de Ayuda
    { path: 'faq', loadComponent: () => import('./preguntas-frecuentes/preguntas-frecuentes.component').then(m => m.PreguntasFrecuentesComponent) },
    { path: 'contacto', loadComponent: () => import('./contacto/contacto.component').then(m => m.ContactoComponent) }
];

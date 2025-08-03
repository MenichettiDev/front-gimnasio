import { Routes } from '@angular/router';

// Rutas para la sección "Ayuda"
export const herramientasRoutes: Routes = [
    // Ruta principal para la sección "Ayuda" (puedes elegir un componente por defecto)
    { path: '', loadComponent: () => import('./cronometro/cronometro.component').then(m => m.CronometroComponent) },

    // Rutas para los diferentes componentes de Ayuda
    { path: 'cronometro', loadComponent: () => import('./cronometro/cronometro.component').then(m => m.CronometroComponent) },
    { path: 'imc-calculadora', loadComponent: () => import('./imc-calculadora/imc-calculadora.component').then(m => m.ImcCalculadoraComponent) },
    { path: 'calorias-calculadora', loadComponent: () => import('./calorias-calculadora/calorias-calculadora.component').then(m => m.CaloriasCalculadoraComponent) }
];

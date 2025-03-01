import { Routes } from '@angular/router';

// Rutas para la sección "Rutinas"
export const loginRoutes: Routes = [
    // { path: '', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) }
];

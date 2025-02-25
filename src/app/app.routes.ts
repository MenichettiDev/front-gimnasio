import { Routes } from '@angular/router';
import { guardsGuard } from './guards.guard'; // Importa el guard
import { ResumenComponent } from './pages/01-inicio/resumen/resumen.component';
import { LoginComponent } from './pages/00-login/login/login.component';


export const routes: Routes = [
    // Ruta para el componente Inicio
    { path: '', loadComponent: () => import('./pages/00-login/home/home.component').then(m => m.HomeComponent) },

    // Ruta Lazy Loading para todas las páginas dentro de "Rutinas"
    // { path: 'login', component: LoginComponent },
    // Ruta Lazy Loading para todas las páginas dentro de "Ejercicios"
    {
        path: 'login',
        loadChildren: () => import('./pages/00-login/login.routes').then(m => m.loginRoutes)
    },
    {
        path: 'inicio',
        loadChildren: () => import('./pages/01-inicio/inicio.routes').then(m => m.inicioRoutes)
    },
    {
        path: 'perfil',
        loadChildren: () => import('./pages/02-perfil/perfil.routes').then(m => m.perfilRoutes)
    },
    {
        path: 'rutinas',
        loadChildren: () => import('./pages/03-rutinas/rutinas.routes').then(m => m.rutinasRoutes)
    },
    {
        path: 'ejercicios',
        loadChildren: () => import('./pages/04-ejercicios/ejercicios.routes').then(m => m.ejerciciosRoutes)
    },
    {
        path: 'asistencia',
        loadChildren: () => import('./pages/05-asistencia/asistencia.routes').then(m => m.asistenciaRoutes)
    },
    {
        path: 'progreso',
        loadChildren: () => import('./pages/06-progreso/progreso.routes').then(m => m.progresoRoutes)
    },
    {
        path: 'comunidad',
        loadChildren: () => import('./pages/07-comunidad/comunidad.routes').then(m => m.comunidadRoutes)
    },
    {
        path: 'configuracion',
        loadChildren: () => import('./pages/08-configuracion/configuracion.routes').then(m => m.configuracionRoutes)
    },
    {
        path: 'ayuda',
        loadChildren: () => import('./pages/09-ayuda/contacto.routes').then(m => m.ayudaRoutes)
    },
    


    // Ruta por defecto
    { path: '**', redirectTo: 'home' }
];

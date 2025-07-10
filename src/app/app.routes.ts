import { Routes } from '@angular/router';
import { guardsGuard } from './guards.guard'; // Importa el guard
import { ResumenComponent } from './pages/01-inicio/resumen/resumen.component';
import { LoginComponent } from './pages/00-login/login/login.component';
import { RegistroEntrenadorComponent } from './pages/Tools/registro-entrenador/registro-entrenador.component';
import { RegistroAtletaComponent } from './pages/Tools/registro-atleta/registro-atleta.component';
import { RegistroGimnasioComponent } from './pages/Tools/registro-gimnasio/registro-gimnasio.component';
import { SeleccionarPerfilComponent } from './pages/Tools/seleccionar-perfil/seleccionar-perfil.component';


export const routes: Routes = [
    // Ruta para el componente Inicio
    { path: '', loadComponent: () => import('./pages/00-login/home/home.component').then(m => m.HomeComponent) },
    // { path: '', loadComponent: () => import('./pages/01-inicio/resumen/resumen.component').then(m => m.ResumenComponent) },

    {
        path: 'login',
        loadChildren: () => import('./pages/00-login/login.routes').then(m => m.loginRoutes)
    },
    {
        path: 'inicio',
        loadChildren: () => import('./pages/01-inicio/inicio.routes').then(m => m.inicioRoutes),
        canActivate: [guardsGuard]
    },
    {
        path: 'perfil',
        loadChildren: () => import('./pages/02-perfil/perfil.routes').then(m => m.perfilRoutes),
        canActivate: [guardsGuard]
    },
    {
        path: 'rutinas',
        loadChildren: () => import('./pages/03-rutinas/rutinas.routes').then(m => m.rutinasRoutes),
        canActivate: [guardsGuard]
    },
    {
        path: 'ejercicios',
        loadChildren: () => import('./pages/04-ejercicios/ejercicios.routes').then(m => m.ejerciciosRoutes),
        canActivate: [guardsGuard]
    },
    {
        path: 'asistencia',
        loadChildren: () => import('./pages/05-asistencia/asistencia.routes').then(m => m.asistenciaRoutes),
        canActivate: [guardsGuard]
    },
    {
        path: 'progreso',
        loadChildren: () => import('./pages/06-progreso/progreso.routes').then(m => m.progresoRoutes),
        canActivate: [guardsGuard]
    },
    {
        path: 'comunidad',
        loadChildren: () => import('./pages/07-comunidad/comunidad.routes').then(m => m.comunidadRoutes),
        canActivate: [guardsGuard]
    },
    {
        path: 'configuracion',
        loadChildren: () => import('./pages/08-configuracion/configuracion.routes').then(m => m.configuracionRoutes),
        canActivate: [guardsGuard]
    },
    {
        path: 'ayuda',
        loadChildren: () => import('./pages/09-ayuda/contacto.routes').then(m => m.ayudaRoutes),
        canActivate: [guardsGuard]
    },

    {
        path: 'registro-entrenador',
        component: RegistroEntrenadorComponent,
    },
    {
        path: 'registro-atleta',
        component: RegistroAtletaComponent,
    },
    {
        path: 'registro-gimnasio',
        component: RegistroGimnasioComponent,
    },
    { path: 'seleccionar-perfil', component: SeleccionarPerfilComponent },



    // Ruta por defecto
    { path: '**', redirectTo: 'inicio' }
];

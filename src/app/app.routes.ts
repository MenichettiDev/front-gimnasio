import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RutinaPageComponent } from './pages/rutina-page/rutina-page.component';
import { RegaloPageComponent } from './pages/regalo-page/regalo-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { guardsGuard } from './guards.guard'; // Importa el guard
import { CargarRutinaComponent } from './pages/cargar-rutina/cargar-rutina.component';
import { CargarPagoPageComponent } from './pages/cargar-pago-page/cargar-pago-page.component';


export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'rutina', component: RutinaPageComponent, canActivate: [guardsGuard] },
    { path: 'cargar-rutina', component: CargarRutinaComponent, canActivate: [guardsGuard] },
    { path: 'cargar-pago', component: CargarPagoPageComponent, canActivate: [guardsGuard] },
    { path: 'regalo', component: RegaloPageComponent },
    {path: '**', component: HomePageComponent}

];

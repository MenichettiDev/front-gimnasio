import { Component, OnInit, OnDestroy, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { ModalConfirmComponent } from '../../components/modal/modal-confirm/modal-confirm.component';
import { Subscription } from 'rxjs';

interface MenuItem {
  id: number;
  descripcion: string;
  icono: string;
  link: string;
  grupo: string;
  principal: boolean;
  orden: number;
  estado: boolean;
  expanded?: boolean;
  requiredAccess: number[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ModalConfirmComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  // Estados del componente
  isModalVisible = false;
  isSidebarVisible = false;
  isLoggedIn = false;
  id_acceso = 1;
  isSmallScreen = window.innerWidth < 992;
  isPerfilModalVisible = false;

  // Agregar propiedades para usuario
  nombreCompleto = '';
  nombreUsuario = '';
  apellidoUsuario = '';

  private subscription = new Subscription();

  // Menú hardcodeado basado en tu estructura
  private readonly allMenuItems: MenuItem[] = [
    // GM01 - Inicio
    { id: 1, descripcion: 'Inicio', icono: 'bi bi-house', link: '/inicio', grupo: 'GM01', principal: true, orden: 1, estado: true, requiredAccess: [1, 2, 3, 4] },
    { id: 2, descripcion: 'Resumen', icono: '', link: '/inicio/resumen', grupo: 'GM01', principal: false, orden: 1, estado: false, requiredAccess: [1, 2, 3, 4] },
    { id: 3, descripcion: 'Noticias', icono: '', link: '/inicio/noticias', grupo: 'GM01', principal: false, orden: 2, estado: true, requiredAccess: [1, 2, 3, 4] },
    // { id: 4, descripcion: 'Cargar Atleta', icono: '', link: '/inicio/cargar-atleta', grupo: 'GM01', principal: false, orden: 3, estado: true, requiredAccess: [1] },
    { id: 5, descripcion: 'Cargar pago', icono: '', link: '/inicio/cargar-pago', grupo: 'GM01', principal: false, orden: 4, estado: true, requiredAccess: [1, 2, 3, 4] },
    { id: 6, descripcion: '+ Relaciones', icono: '', link: '/inicio/relaciones', grupo: 'GM01', principal: false, orden: 5, estado: true, requiredAccess: [1, 2, 3, 4] },
    { id: 6, descripcion: 'Visor Relaciones', icono: '', link: '/inicio/relaciones-vista', grupo: 'GM01', principal: false, orden: 5, estado: true, requiredAccess: [1, 2, 3, 4] },

    // GM02 - Mi Perfil
    { id: 11, descripcion: 'Mi Perfil', icono: 'bi bi-file-person', link: '/perfil', grupo: 'GM02', principal: true, orden: 2, estado: true, requiredAccess: [1, 2, 3, 4] },
    { id: 12, descripcion: 'Perfil', icono: '', link: '/perfil/perfil', grupo: 'GM02', principal: false, orden: 1, estado: true, requiredAccess: [1, 2, 3, 4] },
    { id: 13, descripcion: 'Cargar Medidas', icono: '', link: '/perfil/cargar-medidas', grupo: 'GM02', principal: false, orden: 2, estado: true, requiredAccess: [1, 2, 3] },
    { id: 14, descripcion: 'Historial medidas', icono: '', link: '/perfil/historial-medidas', grupo: 'GM02', principal: false, orden: 3, estado: true, requiredAccess: [1, 2, 3] },
    // { id: 15, descripcion: 'Estadisticas Coach', icono: '', link: '/perfil/coach', grupo: 'GM02', principal: false, orden: 4, estado: true, requiredAccess: [1, 2] },

    // GM03 - Rutinas
    { id: 21, descripcion: 'Rutinas', icono: 'bx bx-book-bookmark', link: '/', grupo: 'GM03', principal: true, orden: 3, estado: true, requiredAccess: [1, 2, 3, 4] },
    // { id: 22, descripcion: 'Actual', icono: '', link: '/rutinas/actual', grupo: 'GM03', principal: false, orden: 1, estado: true, requiredAccess: [2, 3] },
    { id: 23, descripcion: 'Mis rutinas', icono: '', link: '/rutinas/mis-rutinas', grupo: 'GM03', principal: false, orden: 2, estado: true, requiredAccess: [1, 2, 3, 4] },
    // { id: 24, descripcion: 'Recomendadas', icono: '', link: '/rutinas/recomendadas', grupo: 'GM03', principal: false, orden: 3, estado: false, requiredAccess: [2, 3, 4] },
    // { id: 25, descripcion: 'Populares', icono: '', link: '/rutinas/populares', grupo: 'GM03', principal: false, orden: 4, estado: false, requiredAccess: [2, 3, 4] },
    // { id: 26, descripcion: 'Especificas', icono: '', link: '/rutinas/especificas', grupo: 'GM03', principal: false, orden: 5, estado: false, requiredAccess: [2, 3, 4] },
    // { id: 27, descripcion: 'Favoritas', icono: '', link: '/rutinas/favoritas', grupo: 'GM03', principal: false, orden: 6, estado: false, requiredAccess: [1, 2, 3] },
    // { id: 28, descripcion: 'Historial', icono: '', link: '/rutinas/historial', grupo: 'GM03', principal: false, orden: 7, estado: false, requiredAccess: [2, 3] },
    { id: 29, descripcion: 'Crear rutina', icono: '', link: '/rutinas/crear-rutina', grupo: 'GM03', principal: false, orden: 8, estado: true, requiredAccess: [1, 2, 3, 4] },
    // { id: 30, descripcion: 'Reaplicar rutina', icono: '', link: '/rutinas/reaplicar-rutina', grupo: 'GM03', principal: false, orden: 9, estado: true, requiredAccess: [1, 2, 4] },

    // GM04 - Ejercicios
    { id: 32, descripcion: 'Ejercicios', icono: 'bx bx-dumbbell', link: '/ejercicios', grupo: 'GM04', principal: true, orden: 4, estado: true, requiredAccess: [1, 2, 3, 4] },
    { id: 33, descripcion: 'Buscar', icono: '', link: '/ejercicios/buscar', grupo: 'GM04', principal: false, orden: 1, estado: true, requiredAccess: [1, 2, 3, 4] },
    { id: 34, descripcion: 'Cargar nuevo', icono: '', link: '/ejercicios/cargar-nuevo', grupo: 'GM04', principal: false, orden: 2, estado: true, requiredAccess: [1] },
    { id: 36, descripcion: 'Editar Ejercicio', icono: '', link: '/ejercicios/editar-ejercicio', grupo: 'GM04', principal: false, orden: 3, estado: true, requiredAccess: [1] },
    { id: 37, descripcion: 'Repeticiones', icono: '', link: '/ejercicios/crear-repeticion', grupo: 'GM04', principal: false, orden: 4, estado: true, requiredAccess: [1] },

    // GM05 - Asistencia
    // { id: 42, descripcion: 'Asistencia', icono: 'bx bxs-hand', link: '/asistencia', grupo: 'GM05', principal: true, orden: 5, estado: false, requiredAccess: [1, 2, 3, 4] },
    // { id: 43, descripcion: 'Asistencia', icono: '', link: '/asistencia/asistencia', grupo: 'GM05', principal: false, orden: 1, estado: true, requiredAccess: [1, 2, 3, 4] },
    // { id: 44, descripcion: 'Historial asistencia', icono: '', link: '/asistencia/historial', grupo: 'GM05', principal: false, orden: 2, estado: true, requiredAccess: [1, 2, 3, 4] },
    // { id: 45, descripcion: 'Coach', icono: '', link: '/asistencia/coach', grupo: 'GM05', principal: false, orden: 3, estado: true, requiredAccess: [1, 2] },

    // GM06 - Progreso
    { id: 52, descripcion: 'Progreso', icono: 'bi bi-percent', link: '/progreso', grupo: 'GM06', principal: true, orden: 6, estado: true, requiredAccess: [1, 2, 3] },
    // { id: 53, descripcion: 'Estadisticas', icono: '', link: '/progreso/estadistica', grupo: 'GM06', principal: false, orden: 1, estado: true, requiredAccess: [1, 2, 3] },
    { id: 54, descripcion: 'Logros', icono: '', link: '/progreso/logros', grupo: 'GM06', principal: false, orden: 2, estado: true, requiredAccess: [1, 2, 3] },
    { id: 55, descripcion: 'Metas', icono: '', link: '/progreso/metas', grupo: 'GM06', principal: false, orden: 3, estado: true, requiredAccess: [1, 2, 3] },

    // GM07 - Comunidad
    // { id: 62, descripcion: 'Comunidad', icono: 'bi bi-people-fill', link: '/comunidad', grupo: 'GM07', principal: true, orden: 7, estado: true, requiredAccess: [1, 2, 3, 4] },
    // { id: 63, descripcion: 'Grupos', icono: '', link: '/comunidad/grupos', grupo: 'GM07', principal: false, orden: 1, estado: true, requiredAccess: [1, 2, 3, 4] },
    // { id: 64, descripcion: 'Articulos', icono: '', link: '/comunidad/articulos', grupo: 'GM07', principal: false, orden: 2, estado: true, requiredAccess: [1, 2, 3, 4] },

    // GM08 - Configuracion
    // { id: 72, descripcion: 'Configuracion', icono: 'bi bi-gear', link: '/configuracion', grupo: 'GM08', principal: true, orden: 8, estado: true, requiredAccess: [1, 2, 3, 4] },
    // { id: 73, descripcion: 'Editar perfil', icono: '', link: '/configuracion/editar-perfil', grupo: 'GM08', principal: false, orden: 1, estado: true, requiredAccess: [1, 2, 3, 4] },

    // GM09 - Ayuda
    { id: 81, descripcion: 'Ayuda', icono: 'bi bi-info-circle', link: '/ayuda', grupo: 'GM09', principal: true, orden: 9, estado: true, requiredAccess: [1, 2, 3, 4] },
    { id: 82, descripcion: 'Preguntas frecuentes', icono: '', link: '/ayuda/faq', grupo: 'GM09', principal: false, orden: 1, estado: true, requiredAccess: [1, 2, 3, 4] },
    { id: 83, descripcion: 'Contacto', icono: '', link: '/ayuda/contacto', grupo: 'GM09', principal: false, orden: 2, estado: true, requiredAccess: [1, 2, 3, 4] },

    // GM10 - Herramientas
    { id: 91, descripcion: 'Herramientas', icono: 'bi bi-tools', link: '/herramientas', grupo: 'GM10', principal: true, orden: 10, estado: true, requiredAccess: [1, 2, 3, 4] },
    { id: 92, descripcion: 'Cronometro', icono: '', link: '/herramientas/cronometro', grupo: 'GM10', principal: false, orden: 1, estado: true, requiredAccess: [1, 2, 3, 4] },
    { id: 93, descripcion: 'Calculadora IMC', icono: '', link: '/herramientas/imc-calculadora', grupo: 'GM10', principal: false, orden: 2, estado: true, requiredAccess: [1, 2, 3, 4] },


  ];

  // Servicios inyectados
  private authService = inject(AuthService);
  private router = inject(Router);

  @HostListener('window:resize')
  onResize() {
    const previousState = this.isSmallScreen;
    this.isSmallScreen = window.innerWidth < 992;

    if (this.isSmallScreen !== previousState) {
      if (this.isSmallScreen) {
        this.isSidebarVisible = false;
      } else {
        this.isSidebarVisible = this.isLoggedIn;
      }
    }
  }

  ngOnInit() {
    this.loadUserData();
    this.subscription.add(
      this.authService.loggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        this.isSidebarVisible = isLoggedIn && !this.isSmallScreen;

        if (isLoggedIn) {
          this.loadUserData();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadUserData() {
    const user = this.authService.getUser();
    if (user) {
      this.id_acceso = user.id_acceso;
      this.nombreUsuario = user.nombre || '';
      this.apellidoUsuario = user.apellido || '';
      this.nombreCompleto = `${this.nombreUsuario} ${this.apellidoUsuario}`.trim();
    }
  }

  // Getters para el menú filtrado
  get visibleMenuItems(): MenuItem[] {
    return this.allMenuItems.filter(item =>
      item.principal &&
      item.estado &&
      item.requiredAccess.includes(this.id_acceso)
    ).sort((a, b) => a.orden - b.orden);
  }

  // Métodos para el manejo del menú
  getSubMenus(menu: MenuItem): MenuItem[] {
    return this.allMenuItems.filter(item =>
      !item.principal &&
      item.grupo === menu.grupo &&
      item.estado &&
      item.requiredAccess.includes(this.id_acceso)
    ).sort((a, b) => a.orden - b.orden);
  }

  toggleSubMenu(menu: MenuItem) {
    // Cerrar otros menús
    this.visibleMenuItems.forEach(m => {
      if (m !== menu) m.expanded = false;
    });
    menu.expanded = !menu.expanded;
  }

  navigateToSubMenu(subMenu: MenuItem) {
    if (subMenu.link && subMenu.link !== '/') {
      this.router.navigate([subMenu.link]);
      if (this.isSmallScreen) {
        this.isSidebarVisible = false;
      }
    }
  }

  isMenuExpanded(menu: MenuItem): boolean {
    return !!menu.expanded;
  }

  toggleSidebar() {
    if (this.isSmallScreen) {
      this.isSidebarVisible = !this.isSidebarVisible;
    }
  }

  navigateToHome() {
    this.router.navigate(['/inicio']);
  }

  // Métodos del perfil
  getPerfilName(): string {
    const profiles: { [key: number]: string } = {
      1: 'Admin',
      2: 'Entrenador',
      3: 'Atleta',
      4: 'Gimnasio'
    };
    return profiles[this.id_acceso] || 'Usuario';
  }

  getPerfilIcon(): string {
    const icons: { [key: number]: string } = {
      1: 'bx bx-crown',
      2: 'bx bx-dumbbell',
      3: 'bx bx-run',
      4: 'bx bx-building'
    };
    return icons[this.id_acceso] || 'bx bx-user';
  }

  getPerfilClass(): string {
    const classes: { [key: number]: string } = {
      1: 'perfil-admin',
      2: 'perfil-entrenador',
      3: 'perfil-atleta',
      4: 'perfil-gimnasio'
    };
    return classes[this.id_acceso] || 'perfil-default';
  }

  // Método para obtener el nombre completo
  getNombreCompleto(): string {
    return this.nombreCompleto || 'Usuario';
  }

  // Métodos del modal de logout
  confirmLogout() {
    this.isModalVisible = true;
  }

  handleConfirm() {
    this.authService.logout();
    this.router.navigate(['/login/login']);
    this.isModalVisible = false;
  }

  handleCancel() {
    this.isModalVisible = false;
  }

  onPerfilSelected(perfilId: number) {
    this.isPerfilModalVisible = false;

    // Dirigir al formulario correspondiente
    switch (perfilId) {
      case 2: // Entrenador
        this.router.navigate(['/registro-entrenador']);
        break;
      case 3: // Atleta
        this.router.navigate(['/registro-atleta']);
        break;
      case 4: // Gimnasio
        this.router.navigate(['/registro-gimnasio']);
        break;
      default:
        console.error('Perfil no válido');
    }
  }
}
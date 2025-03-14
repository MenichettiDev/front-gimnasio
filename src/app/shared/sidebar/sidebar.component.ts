import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Menu } from '../../data/interfaces/menuInterface'; // Asegúrate de que la ruta sea correcta
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  id_acceso: number = 1;  // ID de acceso del usuario
  menus: Menu[] = [];  // Lista de menús cargados
  isSidebarVisible: boolean = false;  // Controla la visibilidad del sidebar (inicialmente oculto)
  isLoggedIn: boolean = false;  // Propiedad para el estado de login
  private loginStatusSubscription: Subscription | null = null; // Para suscripción al estado de login

  // Inyección de dependencias
  public menuService = inject(MenuService);
  public authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.menus = [];      // Inicializar la lista de menús
    this.loadUserData();  // Cargar datos del usuario al iniciar
    this.getMenus();      // Obtener los menús

    // Inicializar el estado del sidebar basado en el estado de autenticación
    this.isSidebarVisible = this.authService.isLoggedIn();

    // Suscribirse al estado de login
    this.loginStatusSubscription = this.authService.loggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;  // Actualizar estado de login
        this.isSidebarVisible = loggedIn;  // Mostrar/ocultar el sidebar basado en el estado de login
      }
    );
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción al destruir el componente
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  // Cargar datos del usuario
  loadUserData(): void {
    const user = this.authService.getUser();
    if (user) {
      this.id_acceso = user[0].id_acceso;
    }
  }

  // Obtener los menús desde el servicio
  getMenus(): void {
    this.menuService.getMenusByIdAcceso(this.id_acceso).subscribe({
      next: (data) => {
        // Asignamos la propiedad `expanded` con valor `false` para cada menú
        this.menus = data.map((menu: Menu) => ({
          ...menu,
          expanded: false // Inicialmente todos los menús están colapsados
        }));
      },
      error: (error) => {
        console.error('Error al obtener los menús:', error);
        // Mostrar un mensaje de error al usuario
        alert('No se pudieron cargar los menús. Inténtelo de nuevo más tarde.');
      }
    });
  }

  // Cerrar sesión desde el sidebar
  logout(): void {
    this.authService.logout(); // Llamar al logout() del AuthService para cerrar sesión
    console.log('Usuario deslogueado');

    // Redirigir a la página de login/home
    this.router.navigate(['/login/home']);

    // Ocultar el sidebar después de logout
    this.isSidebarVisible = false;
  }

  // Redirigir al login
  login(): void {
    this.router.navigate(['/login']);
  }

  // Obtener los menús principales
  getMainMenus(): Menu[] {
    return this.menus.filter(menu => menu.menu_principal === 1);
  }

  // Obtener los submenús de un menú principal
  getSubMenus(menu: Menu): Menu[] {
    return this.menus.filter(subMenu =>
      subMenu.menu_principal === 0 && subMenu.menu_grupo === menu.menu_grupo);
  }

  // Alternar la visibilidad de los submenús
  toggleSubMenu(menu: Menu): void {
    // Cerrar todos los menús abiertos antes de abrir el seleccionado
    this.menus.forEach(m => {
      if (m !== menu) {
        m.expanded = false;
      }
    });
    // Alternar estado de expansión del menú seleccionado
    menu.expanded = !menu.expanded;
  }

  // Verificar si un menú está expandido
  isMenuExpanded(menu: Menu): boolean {
    return !!menu.expanded; // Convierte `undefined` a `false`
  }

  // Alternar la visibilidad del sidebar
  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  navigateToHome() {
    this.router.navigate(['/inicio']);
  }
}
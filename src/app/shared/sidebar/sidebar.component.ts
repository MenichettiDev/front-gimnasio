import { Component, OnInit, HostListener, OnDestroy, inject } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { CommonModule } from '@angular/common';
import { ModalConfirmComponent } from '../../components/modal/modal-confirm/modal-confirm.component';
import { AuthService } from '../../service/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Menu } from '../../data/interfaces/menuInterface'; // Asegúrate de que la ruta sea correcta
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ModalConfirmComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isModalVisible: boolean = false; // Controla la visibilidad del modal
  id_acceso: number = 1;  // ID de acceso del usuario
  menus: Menu[] = [];  // Lista de menús cargados
  isSidebarVisible: boolean = false;  // Controla la visibilidad del sidebar (inicialmente oculto)
  isLoggedIn: boolean = false;  // Propiedad para el estado de login
  private loginStatusSubscription: Subscription | null = null; // Para suscripción al estado de login
  isSmallScreen: boolean = window.innerWidth < 992; // Detectar si la pantalla es pequeña

  // Inyección de dependencias
  public menuService = inject(MenuService);
  public authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.menus = [];
    this.loadUserData();
    this.getMenus();

    this.isSidebarVisible = this.authService.isLoggedIn();

    this.loginStatusSubscription = this.authService.loggedIn$.subscribe(
      (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        this.isSidebarVisible = loggedIn;
      }
    );

    // Detectar cambios en el tamaño de la pantalla
    window.addEventListener('resize', this.onResize.bind(this));
  }

  // Función para mostrar el modal de confirmación
  confirmLogout(): void {
    this.isModalVisible = true; // Muestra el modal
  }

  // Función para manejar la confirmación del logout
  handleConfirm(): void {
    this.authService.logout(); // Cierra sesión
    this.router.navigate(['/login/home']); // Redirige al login
    this.isModalVisible = false; // Oculta el modal
  }

  // Función para manejar la cancelación del logout
  handleCancel(): void {
    this.isModalVisible = false; // Oculta el modal
  }

  ngOnDestroy(): void {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    const screenWidth = window.innerWidth;
    console.log(screenWidth); // Log del tamaño de la ventana

    const previousState = this.isSmallScreen;

    // Actualizar solo si el estado cambia
    this.isSmallScreen = screenWidth < 992;

    // Solo cambiar si realmente cambia el estado
    if (this.isSmallScreen !== previousState) {
      if (this.isSmallScreen) {
        this.isSidebarVisible = false; // Ocultar el sidebar automáticamente en pantallas pequeñas
      } else {
        this.isSidebarVisible = true; // Mostrar el sidebar automáticamente en pantallas grandes
      }
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

 // Función para cerrar el sidebar automáticamente en pantallas pequeñas
closeSidebarOnSmallScreens(): void {
  if (this.isSmallScreen) {
    this.isSidebarVisible = false; // Ocultar el sidebar
  }
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

  // NO cerrar el sidebar aquí, ya que este es solo para expandir/cerrar submenús
}

// Redirigir al hacer clic en un submenú
navigateToSubMenu(subMenu: Menu): void {
  if (subMenu.menu_link) {
    this.router.navigate([subMenu.menu_link]); // Navegar a la ruta del submenú
    // Cerrar el sidebar automáticamente en pantallas pequeñas
    this.closeSidebarOnSmallScreens();
  }
}

  // Verificar si un menú está expandido
  isMenuExpanded(menu: Menu): boolean {
    return !!menu.expanded; // Convierte `undefined` a `false`
  }

  // Alternar la visibilidad del sidebar
toggleSidebar(): void {
  if (this.isSmallScreen) {
    this.isSidebarVisible = !this.isSidebarVisible;

    // Agregar/remover la clase 'hidden' según la visibilidad
    const sidebarElement = document.querySelector('.sidebar');
    if (sidebarElement) {
      if (!this.isSidebarVisible) {
        sidebarElement.classList.add('hidden');
      } else {
        sidebarElement.classList.remove('hidden');
      }
    }
  }
}

  navigateToHome() {
    this.router.navigate(['/inicio']);
  }
}

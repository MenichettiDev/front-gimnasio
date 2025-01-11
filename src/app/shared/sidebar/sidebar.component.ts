import { Component, inject, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Menu } from '../../data/interfaces/menuInterface';  // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() userId: string = '';  // Recibe el ID del usuario desde el componente padre
  menus: Menu[] = [];  // Menús cargados
  expandedMenus: Set<number> = new Set();  // Para manejar los estados de expansión de los submenús

  public menuService = inject(MenuService);  // Inyección del servicio
  public authService = inject(AuthService);
  private router = inject(Router);  // Inyectar el Router

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.usuario[0].id_persona; // Asumiendo que el objeto `user` tiene un campo `id`
    }
    this.getMenus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this.getMenus();
    }
  }

  getMenus(): void {
    this.userId = this.userId || '4'; // Si no hay userId, se asigna 4
    this.menuService.cargarMenus(this.userId).subscribe(
      (data) => {
        // Asignamos la propiedad `expanded` con valor `false` a cada menú
        this.menus = data.map((menu: Menu) => ({ ...menu, expanded: false }));
        console.log(this.menus);
      },
      (error) => {
        console.error('Error al obtener los menús:', error);
      }
    );
  }

  // Método para ejecutar el logout cuando se haga clic en el ícono
  logout(): void {
    this.authService.logout(); // Llamar al método logout() del AuthService
    console.log('Usuario deslogueado');
    if (this.router.url === '/home') {
      window.location.reload();
    } else {
      this.router.navigate(['/home']);
    }
  }

  // Método para redirigir al login (si no está autenticado)
  login(): void {
    this.router.navigate(['/login']);  // Asumimos que tienes una ruta de login
  }

  // Obtener solo los menús principales (menu_principal == 1)
  getMainMenus(): Menu[] {
    return this.menus.filter(menu => menu.menu_principal === 1);
  }

  // Obtener submenús para un menú principal específico (menu_principal == 0)
  getSubMenus(menu: Menu): Menu[] {
    return this.menus.filter(subMenu =>
      subMenu.menu_principal === 0 && subMenu.menu_grupo === menu.menu_grupo);
  }


  // Alternar la visibilidad de los submenús (independientemente para cada menú)
  toggleSubMenu(menu: Menu): void {
    // Si el menú ya está expandido, lo colapsamos
    menu.expanded = !menu.expanded;
    // Si se quiere colapsar todos los submenús al expandir uno solo, descomentar el siguiente código:
    // if (!this.multiple) {
    //   this.menus.forEach(m => {
    //     if (m !== menu) m.expanded = false;
    //   });
    // }
  }


  // Verificar si un menú está expandido
  isMenuExpanded(menu: Menu): boolean {
    return this.expandedMenus.has(menu.cod_menu);
  }
}

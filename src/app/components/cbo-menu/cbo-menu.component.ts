import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../service/menu.service'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';  // Necesitamos importar NgFor para usarlo
import { FormsModule } from '@angular/forms';
import { Menu } from '../../data/interfaces/menuInterface';


@Component({
  selector: 'app-cbo-menu',
  imports: [CommonModule, FormsModule],  // Importamos NgFor para usarlo en el template
  templateUrl: './cbo-menu.component.html',
  styleUrl: './cbo-menu.component.css'
})
export class CboMenuComponent {

  @Input() label: string = "Selecciona un Menú";  // Para el label del combo
  menus: Menu[] = [];  // Lista de entrenadores
  selectedMenu: Menu | null = null;    // Para el valor seleccionado

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.obtenerMenus();
  }

  // Método para obtener los entrenadores
  obtenerMenus(): void {
    this.menuService.getMenus().subscribe(
      (data) => {
        this.menus = data;  // Asignamos los datos de los entrenadores
      },
      (error) => {
        console.error('Error al obtener menus', error);
      }
    );
  }
}

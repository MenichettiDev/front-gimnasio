export interface Menu {
    cod_menu: number;  // Asumiendo que el código del menú es un número
    menu_descripcion: string;
    menu_icono?: string;
    menu_link: string;
    menu_grupo: string;
    menu_principal: number;  
    menu_orden: number;
    menu_estado: boolean;
    tipo_ruta?: string;
    expanded?: boolean;   // Propiedad para controlar si el submenú está expandido
}
export interface Membresia {

    id_membresia: number;
    id_gimnasio: number;
    nombre: string;
    descripcion: string;
    precio: number;
    duracion: number; // Duración en días (en este caso, 30 días)
    tipo: string; // Puede ser mensual, anual o cualquier otro tipo de membresía
    fecha_creacion: string; // Fecha en formato ISO 8601
    estado: 'activo' | 'inactivo'; // Estado de la membresía

}

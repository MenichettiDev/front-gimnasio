export interface Ejercicio {

    id_ejercicio: number;
    id_grupo_muscular: number;
    id_entrenador: number | null; // Puede ser null si no está asignado
    nombre: string;
    img_1: string | null; // Puede ser null si no hay imagen
    img_2: string | null; // Puede ser null si no hay imagen
    img_3: string | null; // Puede ser null si no hay imagen
    descripcion: string;
    link_video: string | null; // Puede ser null si no hay link
    
}

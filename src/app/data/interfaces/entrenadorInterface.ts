export interface Entrenador {
    id_entrenador: number;
    fecha_ingreso: Date;
    estado: string;
    id_persona: number;
    id_acceso: number;
    nombre: string;
    apellido: string;
    fecha_nacimiento: Date;
    fecha_registro: Date;
    celular: string;
    direccion: string;
    email: string;
    foto_archivo: string;

    // Otros campos según la API
}
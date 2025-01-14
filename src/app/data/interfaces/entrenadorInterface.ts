export interface Entrenador {
    id_entrenador: number;
    dni: string;
    fecha_ingreso: Date;
    estado: string;
    id_persona: number;
    id_acceso: number;
    nombre: string;
    apellido: string;
    apodo: string;
    fecha_nacimiento: Date;
    fecha_registro: Date;
    celular: string;
    direccion: string;
    email: string;
    password: string;
    foto_archivo: string;

    // Otros campos según la API
}
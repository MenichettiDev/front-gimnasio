export interface Persona {
    id_persona: number;
    dni: string;
    fecha_: Date;
    estado: string;
    id_acceso: number;
    nombre: string;
    apellido: string;
    apodo: string;
    fecha_nacimiento: Date;
    fecha_registro: Date;
    celular: string;
    direccion: string;
    email: string;
    foto_archivo: string;

    // Otros campos según la API
}